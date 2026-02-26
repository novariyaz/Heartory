import { useState, useRef, useCallback } from 'react';
import { Sparkles, Send, AlertCircle, Download, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import useSound from 'use-sound';
import DarkVeil from './components/DarkVeil';
import SpotlightCard from './components/SpotlightCard';
import CursorAnimation from './components/CursorAnimation';
import FluidGlassButton from './components/FluidGlassButton';
import VariableProximity from './components/VariableProximity';
import { processEmotion } from './lib/gemini';

function App() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Custom sound hook
  const [playReleaseSound] = useSound('/audio/release.mp3', { volume: 0.3 });

  const handleSubmit = async () => {
    if (!message.trim() || !recipient.trim()) return;
    setIsProcessing(true);
    setAiResponse(null);
    setError(null);

    try {
      // Add haptic feedback if supported
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([15, 30, 15]);
      }
      playReleaseSound();

      const result = await processEmotion(message, recipient);
      setAiResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
      setMessage(""); // Clear message on success
      // Don't clear recipient yet, so we have it for the download filename if needed
    }
  };

  const handleDownload = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);
    try {
      // Use html-to-image for better support with Framer Motion and modern CSS
      const dataUrl = await toPng(resultRef.current, {
        backgroundColor: '#060010',
        pixelRatio: 2,
        filter: (node) => {
          // Re-implement the ignore logic
          if (node.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
            return false;
          }
          return true;
        }
      });
      const link = document.createElement('a');
      link.download = `Heartory-${recipient || 'Insight'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    // "Let it go" feature
    setAiResponse(null);
    setMessage("");
    setRecipient("");
    setError(null);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to submit
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (message.trim() && recipient.trim() && !isProcessing) {
        handleSubmit();
      }
    }
  }, [message, recipient, isProcessing]);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#060010] text-white">
      {/* Background Dark Veil */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
        />
      </div>

      <CursorAnimation />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center space-y-12 px-4 py-8">
        <main className="mx-auto flex w-full flex-col items-center justify-center space-y-10">
          {/* Header Region */}
          <div className="space-y-4 pt-12 text-center">
            <h1 className="mb-2 flex items-center justify-center gap-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
              <img
                src="/heartory.svg"
                alt="Heartory Logo"
                className="h-12 w-12 md:h-16 md:w-16 animate-pulse drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              />
              Heartory
            </h1>
            <VariableProximity
              text="Words left unsaid, finally heard"
              className="justify-center font-light text-white/70 text-lg md:text-2xl"
            />
          </div>

          {/* Input Region */}
          <AnimatePresence mode="wait">
            {!aiResponse && (
              <motion.div
                key="input-form"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <SpotlightCard className="w-full">
                  <div className="space-y-6">
                    <motion.div
                      animate={
                        isProcessing
                          ? { opacity: 0, y: -20, filter: "blur(10px)" }
                          : { opacity: 1, y: 0, filter: "blur(0px)" }
                      }
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <label htmlFor="recipient" className="text-xs font-semibold uppercase tracking-widest text-white/50">To</label>
                        <input
                          id="recipient"
                          type="text"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="their name..."
                          disabled={isProcessing}
                          aria-label="Recipient name"
                          autoComplete="off"
                          className="w-full bg-transparent font-serif text-2xl italic text-white outline-none placeholder:text-white/20 md:text-3xl disabled:opacity-50"
                        />
                      </div>
                      <TextareaAutosize
                        minRows={3}
                        maxRows={8}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type the message you never sent..."
                        disabled={isProcessing}
                        aria-label="Your unsent message"
                        className="w-full resize-none bg-transparent text-xl md:text-2xl font-light leading-relaxed text-white outline-none placeholder:text-white/30 disabled:opacity-50 min-h-[120px]"
                      />
                      <p className="text-xs text-white/20 text-right -mt-2">Press Ctrl+Enter to send</p>
                    </motion.div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="text-sm text-red-500 max-w-[60%]">
                        {error && (
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" /> {error}
                          </span>
                        )}
                      </div>
                      <FluidGlassButton
                        onClick={handleSubmit}
                        disabled={isProcessing || !message.trim() || !recipient.trim()}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 animate-spin" /> Releasing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-5 w-5" /> Let it go →
                          </span>
                        )}
                      </FluidGlassButton>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Response Region */}
          <AnimatePresence>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 1, ease: "easeOut" }}
                ref={resultRef}
                className="w-full bg-[#060010] p-1.5 rounded-3xl mt-4"
              >
                <SpotlightCard className="w-full border-indigo-500/30 relative p-8 md:p-10" spotlightColor="rgba(99, 102, 241, 0.15)">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
                      <div className="flex items-center gap-3 text-indigo-300 pointer-events-none">
                        <Sparkles className="h-6 w-6" />
                        <h3 className="text-xl font-serif italic tracking-wide">
                          {aiResponse.emotion}
                        </h3>
                      </div>
                      <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        data-html2canvas-ignore="true"
                        className="relative z-20 flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white disabled:opacity-50"
                      >
                        <Download className="h-4 w-4" />
                        {isDownloading ? 'Saving Keepsake...' : 'Save Keepsake'}
                      </button>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.5 }}
                      className="font-serif italic leading-[1.8] text-white/90 text-xl md:text-2xl pointer-events-none"
                    >
                      "{aiResponse.insight}"
                    </motion.p>

                    <div className="flex flex-col items-center gap-3 pt-8 border-t border-indigo-500/10 mt-6" data-html2canvas-ignore="true">
                      <motion.button
                        onClick={handleReset}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/50 backdrop-blur-sm transition-all hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300"
                      >
                        <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-90" />
                        Write another
                      </motion.button>
                      <p className="text-xs text-white/20">Release another message into the void</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="w-full py-8 text-center text-sm font-light text-white/40">
          Whispered into the void. Anonymously processed, never saved, and gone the moment you leave.
        </footer>
      </div>
    </div>
  );
}

export default App;
