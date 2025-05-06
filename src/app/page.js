'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import CLD from '../components/CLD';



export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <Navbar />

      <main className={`flex-grow px-8 py-16 ${currentUser ? '' : 'flex flex-col items-center justify-center'}`}>
        <div className="max-w-7xl mx-auto w-full space-y-16">
          {/* Title */}
          <h1 className="text-5xl font-extrabold text-center text-primary tracking-wide mb-12">
            Digital Addiction Among Teenagers in India
          </h1>

          {/* Introduction Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Introduction</h2>
            <div className="flex space-x-8 mb-6">
              <img
                src="/images/image 1.jpeg"
                alt="Teenager using smartphone"
                className="w-1/2 rounded-lg shadow-md"
              />
              <p className="text-xl text-gray-300 leading-relaxed w-1/2">
                Digital addiction among Indian teenagers is a result of multiple interconnected elements within the socio-technical system—ranging from personal habits to platform design. The COVID-19 pandemic acted as a system disturbance, reinforcing existing feedback loops related to screen dependence by reducing access to offline engagement options.
              </p>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              System behavior analysis reveals that although 60% of teens engage in screen use for more than three hours daily, only a fraction derive long-term satisfaction—suggesting a reinforcing loop where screen exposure does not equate to emotional well-being. Uncovering these underlying dynamics is essential to identify effective leverage points for intervention.
            </p>
          </section>

            <section className="bg-white/10 rounded-lg p-6 shadow-md space-y-6 mb-12">
                  <h2 className="text-4xl font-bold text-primary mb-4">📊 Key Statistics</h2>
                  <table className="w-full text-left text-lg text-gray-300 border-t border-gray-500">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="py-2 pr-4">Metric</th>
                        <th className="py-2 pr-4">Value</th>
                        <th className="py-2">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4">Avg. screen time (ages 13–18)</td>
                        <td className="py-2 pr-4">8.5 hrs/day</td>
                        <td className="py-2">NCERT, 2022</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4">Teens more than 3 hrs/day screen use</td>
                        <td className="py-2 pr-4">60%</td>
                        <td className="py-2">Common Sense, 2023</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4">Internet addiction (moderate+)</td>
                        <td className="py-2 pr-4">14.6%</td>
                        <td className="py-2">IJMR, 2022</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4">Parents seeing positive effects</td>
                        <td className="py-2 pr-4">10%</td>
                        <td className="py-2">Common Sense</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Mental health link</td>
                        <td className="py-2 pr-4">Strong</td>
                        <td className="py-2">JAMA Pediatrics, 2021</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

          {/* Key Findings Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Key Findings</h2>
            <div className="flex space-x-8 mb-6">
              <p className="text-xl text-gray-300 leading-relaxed w-1/2">
                Several core factors contribute to the rise of digital addiction. These factors are not only a result of personal choices but are also influenced by the digital environment and broader societal shifts.
              </p>
              <img
                src="/images/image 2.jpeg"
                alt="Addictive platform design"
                className="w-1/2 rounded-lg shadow-md"
              />
            </div>
            <ul className="list-disc pl-6 text-xl text-gray-300 space-y-3">
              <li><strong>Reinforcing Platform Design:</strong> Platforms operate as self-reinforcing feedback systems, where notifications and gamified interactions increase user engagement, which in turn triggers more algorithmic targeting and emotional dependence.</li>
              <li><strong>Technology Access as an Enabler:</strong> The wide availability of smartphones and low-cost data act as structural enablers within the system, amplifying screen exposure and normalizing prolonged digital consumption across socioeconomic strata.</li>
              <li><strong>Social Needs & Emotional Loops:</strong> Teenagers often engage with screens to meet emotional needs—creating balancing loops where temporary stress relief reinforces long-term disengagement from physical environments.</li>
              <li><strong>Peer Norms as Mental Models:</strong> Peer pressure and social media expectations shape mental models around identity and success, thereby normalizing digital overuse and discouraging self-regulation practices.</li>
            </ul>

          </section>

          {/* Impacts Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Impacts of Screen Addiction</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The consequences of excessive screen use are far-reaching, affecting various aspects of a teenager's life. These impacts are not just personal but have societal implications, influencing mental health, education, and future career prospects.
            </p>
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full table-auto text-xl text-gray-300">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Impact</th>
                    <th className="px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4">Mental Health</td>
                    <td className="px-6 py-4">Studies show that excessive screen time is linked to depression, anxiety, and ADHD symptoms. Disrupting sleep patterns and social isolation exacerbate these issues.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Physical Health</td>
                    <td className="px-6 py-4">Obesity, poor posture, and disrupted sleep are common among screen-addicted teens. Blue light from screens disrupts circadian rhythms, affecting sleep quality.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Social Life</td>
                    <td className="px-6 py-4">Teens are increasingly isolated from real-life interactions, damaging their social skills and relationships. Virtual interactions often replace in-person connections.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Academic Performance</td>
                    <td className="px-6 py-4">Prolonged screen use distracts from academic responsibilities, leading to lower grades and reduced focus in studies.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Causal Loop Diagram Section */}
          <section className="space-y-8 mt-10">
            <h2 className="text-4xl font-bold text-primary mb-4">Causal Loop Diagram (CLD)</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The following Causal Loop Diagram (CLD) demonstrates the key feedback loops that drive digital addiction among Indian teenagers. These loops highlight the reinforcing cycles that make it difficult to break the addiction without systemic interventions.
            </p>
            <div className="bg-white/5 p-6 rounded-lg shadow-lg mt-6">
              <CLD />
            </div>
          </section>

          {/* Proposed Interventions Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Proposed Interventions</h2>
            <div className="flex space-x-8 mb-6">
              <img
                src="/images/image 3.jpeg"
                alt="Promoting offline activities"
                className="w-1/2 rounded-lg shadow-md"
              />
              <p className="text-xl text-gray-300 leading-relaxed w-1/2">
                Addressing digital addiction requires structural interventions that target the root causes rather than merely treating symptoms. Effective solutions will need to combine policy changes, education, and community-driven initiatives.
              </p>
            </div>
            <ul className="list-disc pl-6 text-xl text-gray-300 space-y-3">
              <li><strong>Design-Based Leverage:</strong> Redesigning platform features to reduce addictive feedback (like infinite scrolling and constant alerts) can shift user behavior without removing the technology itself.</li>
              <li><strong>Shifting Mental Models:</strong> Educating teens on digital well-being can help reframe beliefs about constant connectivity, creating long-term shifts in usage behavior across the system.</li>
              <li><strong>Strengthening Alternative Feedback Loops:</strong> Supporting offline activities introduces positive feedback cycles that counteract digital overuse by fulfilling social and emotional needs in healthier ways.</li>
              <li><strong>Policy-Level Interventions:</strong> Implementing guardrails at the system level—such as screen-time guidelines in schools—can stabilize the system against unregulated screen exposure.</li>
            </ul>
          </section>

          {/* Conclusion Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Conclusion</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Digital addiction among Indian teenagers is a complex issue with multiple causes and consequences. The increasing screen time, coupled with the rise in mental health and social issues, calls for urgent action. While existing solutions like parental monitoring and digital literacy programs provide some relief, they are not sufficient on their own. A holistic approach that includes regulation of addictive platform features, promotion of offline activities, and enhanced mental health support offers the best chance to mitigate digital addiction in the long term.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mt-4">
              In conclusion, addressing digital addiction requires a multi-pronged approach involving the government, tech companies, educators, parents, and the teens themselves. Only by working together can we create a digital environment that supports the well-being of our future generation.
            </p>
          </section>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FSTApp. All rights reserved.
      </footer>
    </div>
  );
}
