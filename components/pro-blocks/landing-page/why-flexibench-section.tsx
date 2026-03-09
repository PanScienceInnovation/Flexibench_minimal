"use client";

import { whyFlexibenchPoints } from "@/lib/flexibench-content";

// Helper function to highlight phrases in text
function highlightPhrases(text: string, phrases: string[]): JSX.Element[] {
  if (phrases.length === 0) return [<span key="text">{text}</span>];
  
  let result: JSX.Element[] = [];
  let lastIndex = 0;
  let keyCounter = 0;
  
  // Sort phrases by length (longest first) to handle overlapping matches
  const sortedPhrases = [...phrases].sort((a, b) => b.length - a.length);
  
  // Find all matches
  const matches: Array<{ start: number; end: number; text: string }> = [];
  sortedPhrases.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0]
      });
    }
  });
  
  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);
  
  // Remove overlapping matches (keep first)
  const nonOverlapping: typeof matches = [];
  matches.forEach(match => {
    if (nonOverlapping.length === 0 || match.start >= nonOverlapping[nonOverlapping.length - 1].end) {
      nonOverlapping.push(match);
    }
  });
  
  // Build result
  nonOverlapping.forEach(match => {
    // Add text before match
    if (match.start > lastIndex) {
      result.push(<span key={`text-${keyCounter++}`}>{text.substring(lastIndex, match.start)}</span>);
    }
    // Add highlighted match
    result.push(<span key={`highlight-${keyCounter++}`} className="text-[#1A1AFF] font-medium">{match.text}</span>);
    lastIndex = match.end;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push(<span key={`text-${keyCounter++}`}>{text.substring(lastIndex)}</span>);
  }
  
  return result.length > 0 ? result : [<span key="text">{text}</span>];
}

export function WhyFlexibenchSection() {
  // Use first 4 cards
  const cards = whyFlexibenchPoints.slice(0, 4);
  
  // Define which phrases to highlight in each card title
  const titleHighlights: { [key: number]: string[] } = {
    0: ['Data Engine', 'AI'], // Card 1: "Annotation Is Not a Service, It Is the Data Engine That Powers AI"
    1: ['Experience'], // Card 2: "Built From Experience, Not Assumption"
    2: ['Quality', 'Design'], // Card 3: "Quality First by Design"
    3: ['Adapts', 'Problem'], // Card 4: "Annotation That Adapts to the Problem"
  };
  
  // Define which words to highlight in descriptions
  const descriptionHighlights = [
    'data', 'AI', 'model', 'annotation', 'engineering', 'Flexibench', 'quality', 'workflows', 'platform', 'ontologies'
  ];

  return (
        <section
          className="relative bg-[#F7F6F3] section-padding-y border-b border-[#E3E3E0] overflow-hidden"
          id="why-flexibench"
        >
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-16">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
              <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] bg-white px-3 py-1 rounded-[3px] text-[#737373]">
                Why Flexibench
              </div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] text-center max-w-3xl mx-auto">
                <span className="text-[#1A1AFF]">High-Quality</span> Data Is the{" "}
                <span className="text-[#1A1AFF]">Foundation</span>{" "}
                of Every <span className="text-[#1A1AFF]">Successful</span> AI Model
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] text-center max-w-2xl mx-auto">
                Most <span className="text-[#1A1AFF] font-medium">annotation</span> tools treat labeling as a task. We treat it as <span className="text-[#1A1AFF] font-medium">data engineering</span> because the
                right labels determine whether a <span className="text-[#1A1AFF] font-medium">model</span> succeeds, fails, or never gets deployed.
              </p>
        </div>

        {/* Cards Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mt-8 sm:mt-12 md:mt-16">
              {cards.map((point, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#E3E3E0] rounded-[4px] p-6 sm:p-8 hover:border-[#1A1AFF] transition-colors duration-200"
                >
                  <div className="font-mono text-[11px] text-[#A3A3A3] mb-3">
                    {String(index + 1).padStart(2, '0')} /
                  </div>
                  <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] mb-3">
                    {highlightPhrases(point.title, titleHighlights[index] || [])}
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] leading-[1.7]">
                    {point.description.split(/(\s+)/).map((word, i) => {
                      const cleanWord = word.trim().toLowerCase().replace(/[.,;:!?]/g, '');
                      const shouldHighlight = descriptionHighlights.some(term => 
                        cleanWord === term || cleanWord.includes(term)
                      );
                      
                      if (shouldHighlight && word.trim()) {
                        return <span key={i} className="text-[#1A1AFF] font-medium">{word}</span>;
                      }
                      return <span key={i}>{word}</span>;
                    })}
                  </p>
                </div>
              ))}
            </div>
      </div>
    </section>
  );
}
