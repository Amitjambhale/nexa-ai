import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Baby,
  Home,
  Banknote,
  ShieldCheck,
  Umbrella,
  RefreshCw,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import "./LifeInsuranceSection.scss";

const insurancePlans = [
  {
    id: 1,
    title: "Endowment Plans",
    desc: "Build long-term savings while enjoying life cover and guaranteed maturity benefits.",
    icon: <TrendingUp />,
    color: "#c5a059",
  },
  {
    id: 2,
    title: "Children Plans",
    desc: "Secure your child’s education, marriage, and future goals even in your absence.",
    icon: <Baby />,
    color: "#1a2b4c",
  },
  {
    id: 3,
    title: "Pension Plans",
    desc: "Ensure a steady income after retirement and live a stress-free golden life.",
    icon: <Home />,
    color: "#c5a059",
  },
  {
    id: 4,
    title: "Money Back Plans",
    desc: "Get periodic returns during the policy term along with complete life protection.",
    icon: <Banknote />,
    color: "#1a2b4c",
  },
  {
    id: 5,
    title: "Whole Life Plans",
    desc: "Lifetime protection with savings benefits to support your family for generations.",
    icon: <ShieldCheck />,
    color: "#1a2b4c",
  },
  {
    id: 6,
    title: "ULIP Plans",
    desc: "Combine insurance and investment to grow wealth while protecting your loved ones.",
    icon: <Umbrella />,
    color: "#c5a059",
  },
  {
    id: 7,
    title: "Term Plans",
    desc: "High coverage at affordable premiums to safeguard your family’s financial future.",
    icon: <RefreshCw />,
    color: "#1a2b4c",
  },
  {
    id: 8,
    title: "Micro Insurance",
    desc: "Affordable insurance solutions designed for low-income families and individuals.",
    icon: <PiggyBank />,
    color: "#c5a059",
  },
];

const LifeInsuranceSection = () => {
  return (
    <section className="life-ins-wrapper">
      <div className="life-container">
        {/* Section Header */}
        <motion.div
          className="life-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="life-tag">OUR SPECIALIZATION</span>

          <h2>
            Life <span>Insurance</span> Plans
          </h2>
          {/* <div className="life-underline"></div> */}
        </motion.div>

        {/* Plans Grid */}
        <div className="life-grid">
          {insurancePlans.map((plan, index) => (
            <motion.div
              className="life-card"
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Hover Background */}
              <div className="life-card-bg"></div>

              <div className="life-content-inner">
                <div
                  className="life-icon-box"
                  style={{ "--icon-color": plan.color }}
                >
                  {plan.icon}
                </div>

                <h3>{plan.title}</h3>

                <p className="life-desc">{plan.desc}</p>

                <button className="life-read-btn">
                  <span>READ MORE</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="life-card-number">0{index + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeInsuranceSection;
