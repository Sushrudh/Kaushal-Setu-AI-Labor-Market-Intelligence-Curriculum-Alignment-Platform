import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [stakeholderType, setStakeholderType] = useState('DSDC / Govt');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8F5F0] py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block">
            Stakeholder Inquiries & Integration Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#191817]">
            Connect with the Kaushal Setu Program Office
          </h1>
          <p className="text-sm sm:text-base text-[#81766D] leading-relaxed">
            Have inquiries regarding District Skill Committee onboarding, MIDC employer survey integration, or ITI syllabus alignment? Get in touch with our technical team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs space-y-4">
              <h4 className="text-base font-serif font-bold text-[#191817]">
                State Coordination Cell
              </h4>
              <div className="space-y-3 text-xs text-[#81766D]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4F8279] shrink-0 mt-0.5" />
                  <span>
                    Directorate of Vocational Education & Training (DVET), 3 Mahapalika Marg, Mumbai, Maharashtra 400001
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#4F8279] shrink-0" />
                  <span>+91 20 2612 8841 (Pune DSDC Desk)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#4F8279] shrink-0" />
                  <span>support@kaushalsetu.gov.in</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#191817] text-[#F8F5F0] rounded-2xl space-y-2">
              <h5 className="font-serif font-semibold text-sm">
                Technical API Documentation
              </h5>
              <p className="text-xs text-[#81766D] leading-relaxed">
                Registered state agencies and MIDC industrial associations can request secure REST API keys for National Career Service (NCS) and ITI seat census streaming.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#191817]">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-[#81766D] max-w-sm mx-auto">
                    Thank you, {name}. A member of the Kaushal Setu District Integration Cell will review your request and respond within 2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-4 py-2 bg-[#F3EEE6] text-xs font-semibold text-[#191817] rounded-md hover:bg-[#E7E1D9] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-lg font-serif font-bold text-[#191817] mb-2">
                    Submit a Coordination Request
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#191817] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Ashok Deshmukh"
                        className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#191817] mb-1">
                        Official Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ashok@iti.gov.in"
                        className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#191817] mb-1">
                        Organization / Department
                      </label>
                      <input
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. ITI Nashik / MIDC Pune"
                        className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#191817] mb-1">
                        Stakeholder Category
                      </label>
                      <select
                        value={stakeholderType}
                        onChange={(e) => setStakeholderType(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                      >
                        <option value="DSDC / Govt">District Skill Committee (DSDC)</option>
                        <option value="Vocational Institution">ITI / Polytechnic Principal</option>
                        <option value="Industry Employer">MIDC / Industry Employer</option>
                        <option value="Student / Trainee">Student / Trainee Job Seeker</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#191817] mb-1">
                      Message / Proposal Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry, curriculum proposal, or requested data integration..."
                      className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-[#191817] bg-[#F5ED78] hover:bg-[#eae162] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
