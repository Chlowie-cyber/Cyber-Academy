// ============================================================================
// CYBER ACADEMY — COMPREHENSIVE SYLLABUS DATA MODEL
// 8 Units mapping to ISC2 CC Domains + Career Progression
// ============================================================================

export type Phase = 'learn' | 'check' | 'test' | 'unlock'

export interface SyllabusSection {
  heading: string
  body: string
  keyTerms?: { term: string; definition: string }[]
}

export interface CheckInQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface ExamVariant {
  // Each variant rephrases the question or changes the scenario
  question: string
  options: string[]
  correctIndex: number
}

export interface ExamQuestion {
  id: string
  concept: string
  variants: ExamVariant[] // 2-3 variants for mutation
  feedback: string // detailed constructive feedback shown on wrong answer
}

export interface MasteryHub {
  github: {
    title: string
    description: string
    code: string // markdown blueprint
  }
  linkedin: {
    copy: string
    hashtags: string[]
  }
  forage?: {
    title: string
    description: string
    program: string
    url: string
  }
}

export interface Unit {
  id: number
  title: string
  subtitle: string
  domainMapping: string
  icon: string
  syllabus: SyllabusSection[]
  checkIns: CheckInQuestion[]
  exam: ExamQuestion[]
  mastery: MasteryHub
}

// ============================================================================
// UNIT 1 — Intro to Cybersecurity
// ============================================================================
const unit1: Unit = {
  id: 1,
  title: 'Intro to Cybersecurity',
  subtitle: 'Security Principles & Foundations',
  domainMapping: 'Domain 1 — Security Principles (CIA Triad, Authentication/Authorization/Accounting, Non-repudiation, Privacy fundamentals)',
  icon: 'shield',
  syllabus: [
    {
      heading: 'What is Cybersecurity?',
      body: 'Cybersecurity is the practice of protecting systems, networks, data, and programs from digital attacks. These cyberattacks aim to access, change, or destroy sensitive information; extort money from users; or interrupt normal business processes. Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative. A strong cybersecurity architecture is layered — it combines people, processes, and technology to create a defense-in-depth strategy that assumes no single control is sufficient on its own.',
      keyTerms: [
        { term: 'Confidentiality', definition: 'Ensuring information is accessible only to authorized entities.' },
        { term: 'Integrity', definition: 'Maintaining the accuracy and completeness of data across its lifecycle.' },
        { term: 'Availability', definition: 'Ensuring authorized users have timely and reliable access to data and resources.' },
      ],
    },
    {
      heading: 'The CIA Triad',
      body: 'The CIA Triad is the foundational model of information security, guiding security policies and controls. Confidentiality ensures that data is only accessible to those authorized — enforced through encryption, access controls, and data classification. Integrity ensures that data has not been altered or tampered with in transit or at rest — enforced through hashing, digital signatures, and checksums. Availability ensures that systems and data are accessible when needed — enforced through redundancy, backups, and disaster recovery. Every security control maps back to at least one leg of the triad. When analyzing any threat or control, ask: "Which leg of the triad does this protect?"',
      keyTerms: [
        { term: 'Encryption', definition: 'The process of converting plaintext into ciphertext to protect confidentiality.' },
        { term: 'Hashing', definition: 'A one-way function that produces a fixed-size output to verify data integrity.' },
        { term: 'Redundancy', definition: 'Duplicating critical components to ensure availability if one fails.' },
      ],
    },
    {
      heading: 'Authentication, Authorization & Accounting (AAA)',
      body: 'The AAA framework is the backbone of access control. Authentication verifies WHO you are — typically through passwords, biometrics, tokens, or multi-factor combinations. Authorization determines WHAT you can do — enforced through access control lists, role-based permissions, and policy engines. Accounting tracks WHAT you did — logging every action for audit, compliance, and incident investigation. Together, AAA ensures that the right people get the right access, and that all actions are traceable. A common mistake is conflating authentication with authorization — just because you can log in does not mean you should access everything.',
      keyTerms: [
        { term: 'MFA', definition: 'Multi-Factor Authentication — requiring two or more verification factors.' },
        { term: 'Principle of Least Privilege', definition: 'Granting only the minimum access necessary to perform a task.' },
        { term: 'Audit Log', definition: 'A chronological record of system activities for accountability.' },
      ],
    },
    {
      heading: 'Non-Repudiation',
      body: 'Non-repudiation is the assurance that someone cannot deny the validity of something they said or did. In cybersecurity, it proves that a message was sent by a specific sender, or that an action was taken by a specific user, and neither party can later deny it. This is achieved through digital signatures, cryptographic message authentication codes, and secure audit logs. Non-repudiation is critical in legal contexts, financial transactions, and contract signing. Without it, a malicious actor could simply deny sending a harmful payload or authorizing a fraudulent transfer.',
      keyTerms: [
        { term: 'Digital Signature', definition: 'A cryptographic proof of origin and integrity that the sender cannot deny.' },
        { term: 'MAC', definition: 'Message Authentication Code — verifies message integrity and origin.' },
      ],
    },
    {
      heading: 'Privacy Fundamentals',
      body: 'Privacy in cybersecurity means giving individuals control over how their personal data is collected, used, shared, and retained. It is distinct from confidentiality — confidentiality is about access control, while privacy is about rights and consent. Frameworks like GDPR (Europe), CCPA (California), and HIPAA (Healthcare) codify privacy obligations. Key principles include data minimization (collect only what you need), purpose limitation (use data only for stated purposes), and the right to be forgotten. Security controls protect privacy, but privacy also requires governance, policy, and legal compliance.',
      keyTerms: [
        { term: 'PII', definition: 'Personally Identifiable Information — data that can identify a specific individual.' },
        { term: 'Data Minimization', definition: 'Collecting and retaining only the minimum data necessary.' },
        { term: 'GDPR', definition: 'General Data Protection Regulation — EU privacy law governing personal data.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '1c1',
      question: 'Which leg of the CIA Triad does encryption primarily protect?',
      options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
      correctIndex: 0,
      explanation: 'Encryption converts plaintext into ciphertext, ensuring that only authorized parties can read the data. This directly protects Confidentiality — the "C" in CIA.',
    },
    {
      id: '1c2',
      question: 'A user logs in with a password and an SMS code. Which AAA component does this represent?',
      options: ['Authorization', 'Accounting', 'Authentication', 'Auditing'],
      correctIndex: 2,
      explanation: 'Verifying identity through passwords and codes is Authentication — proving WHO you are. Authorization comes after, determining what you can access.',
    },
    {
      id: '1c3',
      question: 'A digital signature prevents a sender from denying they sent a message. What security property is this?',
      options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
      correctIndex: 3,
      explanation: 'Non-repudiation ensures a party cannot deny the authenticity of their signature or message. Digital signatures provide cryptographic proof of origin.',
    },
  ],
  exam: [
    {
      id: '1e1',
      concept: 'CIA Triad — Confidentiality',
      variants: [
        {
          question: 'An attacker intercepts an unencrypted email containing sensitive financial data. Which CIA Triad principle was violated?',
          options: ['Confidentiality', 'Integrity', 'Availability', 'Accountability'],
          correctIndex: 0,
        },
        {
          question: 'A hospital database stores patient records in plaintext with no access controls. Any staff member can view any patient file. Which CIA principle is MOST at risk?',
          options: ['Availability', 'Integrity', 'Confidentiality', 'Non-repudiation'],
          correctIndex: 2,
        },
        {
          question: 'A company fails to encrypt its customer database backups, which are then stolen from a data center. Which leg of the CIA Triad was primarily compromised?',
          options: ['Integrity', 'Confidentiality', 'Availability', 'Authentication'],
          correctIndex: 1,
        },
      ],
      feedback: 'Confidentiality is about keeping data secret from unauthorized parties. When data is exposed, intercepted, or stored without encryption/access controls, confidentiality is broken. Ask yourself: "Did unauthorized eyes see the data?" If yes, it is a confidentiality violation. Re-read the CIA Triad section and focus on what each leg specifically protects.',
    },
    {
      id: '1e2',
      concept: 'AAA Framework — Authentication vs Authorization',
      variants: [
        {
          question: 'After logging in, a user tries to access the admin panel but receives "Access Denied." Which AAA component is enforcing this restriction?',
          options: ['Authentication', 'Authorization', 'Accounting', 'Availability'],
          correctIndex: 1,
        },
        {
          question: 'A system logs every file a user downloads with their username and timestamp. Which AAA component does this represent?',
          options: ['Authentication', 'Authorization', 'Accounting', 'Non-repudiation'],
          correctIndex: 2,
        },
        {
          question: 'A user enters their username and password, then scans their fingerprint. The system grants a token. Which AAA component just completed?',
          options: ['Accounting', 'Authorization', 'Authentication', 'Auditing'],
          correctIndex: 2,
        },
      ],
      feedback: 'Remember the AAA order: Authentication = WHO are you? Authorization = WHAT can you do? Accounting = WHAT did you do? Access-denied after login is Authorization. Logging actions is Accounting. Verifying identity (passwords, biometrics, tokens) is Authentication. Re-read the AAA section and map each scenario to the correct "A".',
    },
    {
      id: '1e3',
      concept: 'Non-repudiation',
      variants: [
        {
          question: 'Which cryptographic mechanism provides non-repudiation for a digital document?',
          options: ['Symmetric encryption', 'Hashing alone', 'Digital signatures', 'Firewall rules'],
          correctIndex: 2,
        },
        {
          question: 'A vendor denies signing a purchase order, claiming someone else placed the order. Which security property, if properly implemented, would prove the vendor signed it?',
          options: ['Confidentiality', 'Availability', 'Non-repudiation', 'Least Privilege'],
          correctIndex: 2,
        },
        {
          question: 'Why does a simple hash of a document NOT provide non-repudiation?',
          options: [
            'Because hashes are reversible',
            'Because anyone can compute the same hash, so it does not prove WHO created it',
            'Because hashes are too slow',
            'Because hashes only work on small files',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Non-repudiation requires proof of origin that the sender cannot deny. A digital signature uses the sender\'s PRIVATE key — only they could have produced it, so they cannot deny sending it. A hash alone proves integrity (data was not changed) but NOT origin, because anyone can hash the same data. Re-read the Non-Repudiation section and understand the difference between integrity and non-repudiation.',
    },
    {
      id: '1e4',
      concept: 'Privacy vs Confidentiality',
      variants: [
        {
          question: 'A company collects customer location data "just in case we need it later" without a specific purpose. Which privacy principle is violated?',
          options: ['Data Minimization', 'Purpose Limitation', 'Both A and B', 'Non-repudiation'],
          correctIndex: 2,
        },
        {
          question: 'Under GDPR, a user requests that a company delete all their personal data. Which privacy right are they exercising?',
          options: ['Right to Access', 'Right to be Forgotten', 'Right to Portability', 'Right to Object'],
          correctIndex: 1,
        },
        {
          question: 'Which statement correctly distinguishes privacy from confidentiality?',
          options: [
            'Privacy and confidentiality are the same thing',
            'Confidentiality is about access control; privacy is about rights and consent over personal data',
            'Privacy is a technical control; confidentiality is a legal concept',
            'Confidentiality only applies to governments',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Confidentiality = access control (who can see the data). Privacy = rights and consent (how personal data is collected, used, shared, and deleted). Collecting data "just in case" violates both data minimization (collect only what you need) and purpose limitation (use only for stated purposes). The "Right to be Forgotten" lets users request deletion under GDPR. Re-read the Privacy Fundamentals section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: CIA Triad Data Classifier',
      description: 'Build a Python CLI tool that classifies data samples into Confidentiality, Integrity, or Availability categories and recommends appropriate controls.',
      code: `# cia_triad_classifier.py
# Cyber Academy — Unit 1 Portfolio Lab
# Classify data samples and recommend security controls

data_samples = [
    {"name": "Customer SSN Database", "type": "PII", "encrypted": False},
    {"name": "Financial Transaction Log", "type": "Financial", "encrypted": True},
    {"name": "Public Marketing Page", "type": "Public", "encrypted": False},
    {"name": "Medical Records Backup", "type": "PHI", "encrypted": False},
]

def classify(sample):
    controls = []
    if sample["type"] in ("PII", "PHI", "Financial") and not sample["encrypted"]:
        controls.append("ENCRYPT AT REST — Confidentiality at risk")
    if sample["type"] in ("Financial", "PHI"):
        controls.append("HASH + DIGITAL SIGNATURE — Integrity & Non-repudiation")
    controls.append("BACKUP + REDUNDANCY — Availability")
    return controls

for sample in data_samples:
    print(f"\\n[{sample['name']}]")
    for control in classify(sample):
        print(f"  -> {control}")

# Run: python cia_triad_classifier.py`,
    },
    linkedin: {
      copy: "I just completed Unit 1 of my Cyber Academy journey — Intro to Cybersecurity! I now understand the CIA Triad (Confidentiality, Integrity, Availability), the AAA framework (Authentication, Authorization, Accounting), non-repudiation through digital signatures, and privacy fundamentals including GDPR principles. Building my foundation toward the ISC2 Certified in Cybersecurity (CC) certification. Excited to keep learning in public! 🛡️",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#CIATriad', '#InfoSec'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Complete the introductory cybersecurity awareness module to practice identifying CIA Triad violations in real-world scenarios.',
      program: 'AIG Cybersecurity Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 2 — Common Threats & Attacks
// ============================================================================
const unit2: Unit = {
  id: 2,
  title: 'Common Threats & Attacks',
  subtitle: 'Threat Actors, Malware & Social Engineering',
  domainMapping: 'Domains 1 & 2 (Threat Actors: Script Kiddies vs. APTs, Malware typologies, Social Engineering variations, Network Layer Attacks)',
  icon: 'bug',
  syllabus: [
    {
      heading: 'Threat Actor Categories',
      body: 'Not all attackers are the same. Script Kiddies use pre-made tools and exploits written by others, with little understanding of how they work — they are opportunistic and low-skill. Hacktivists attack for political or ideological causes, targeting organizations that oppose their agenda. Organized Cybercriminals operate like businesses, motivated by financial gain through ransomware, fraud, and data theft — they are well-funded and structured. Advanced Persistent Threats (APTs) are nation-state or state-sponsored groups that conduct long-term, stealthy campaigns, often targeting critical infrastructure, defense, and intellectual property. Understanding the attacker\'s motivation and capability determines your defense strategy.',
      keyTerms: [
        { term: 'APT', definition: 'Advanced Persistent Threat — a stealthy, long-term attacker, often nation-state sponsored.' },
        { term: 'Script Kiddie', definition: 'A low-skill attacker who uses pre-built tools without understanding them.' },
        { term: 'Hacktivist', definition: 'An attacker motivated by political or ideological causes.' },
      ],
    },
    {
      heading: 'Malware Typologies',
      body: 'Malware (malicious software) comes in many forms, each with distinct behaviors. Viruses attach themselves to clean files and spread when those files are executed. Worms self-replicate across networks without user action, exploiting vulnerabilities to spread. Trojans disguise themselves as legitimate software but contain hidden malicious payloads. Ransomware encrypts a victim\'s files and demands payment for decryption — one of the most financially devastating attack types. Spyware covertly monitors user activity, capturing keystrokes and data. Rootkits embed deep in the operating system to maintain persistent, hidden access. Understanding the malware type tells you how it spreads, what it does, and how to eradicate it.',
      keyTerms: [
        { term: 'Ransomware', definition: 'Malware that encrypts files and demands payment for decryption.' },
        { term: 'Worm', definition: 'Self-replicating malware that spreads across networks without user action.' },
        { term: 'Rootkit', definition: 'Stealthy malware that maintains persistent, hidden access at the OS level.' },
      ],
    },
    {
      heading: 'Social Engineering Variations',
      body: 'Social engineering manipulates human psychology rather than technology. Phishing is the broadest form — mass emails pretending to be from trusted sources to steal credentials or deliver malware. Spear Phishing is a targeted version, customized for a specific individual using their name, role, or organization — far more convincing and dangerous. Vishing (voice phishing) happens over phone calls, where attackers impersonate IT support, banks, or executives. Smishing uses SMS text messages with malicious links. Whaling targets high-ranking executives (CEOs, CFOs) whose access and authority make them valuable. Baiting uses physical media (infected USB drives) or fake downloads to lure victims. The key defense is verification — always confirm through a separate, trusted channel.',
      keyTerms: [
        { term: 'Phishing', definition: 'Mass deceptive emails to steal credentials or deliver malware.' },
        { term: 'Spear Phishing', definition: 'Targeted phishing customized for a specific individual.' },
        { term: 'Vishing', definition: 'Voice phishing — social engineering over phone calls.' },
        { term: 'Whaling', definition: 'Phishing targeting high-ranking executives.' },
      ],
    },
    {
      heading: 'Network Layer Attacks',
      body: 'Network-layer attacks exploit how data moves across networks. A Man-in-the-Middle (MITM) attack intercepts communication between two parties, allowing the attacker to eavesdrop or alter data — defeated by encryption (TLS/HTTPS). Denial of Service (DoS) and Distributed Denial of Service (DDoS) floods overwhelm a target with traffic, making it unavailable to legitimate users — DDoS uses many compromised machines (a botnet). DNS Spoofing (DNS cache poisoning) redirects users from legitimate sites to malicious ones by corrupting DNS records. Packet Sniffing captures network traffic to extract credentials or data — effective on unencrypted networks. Port scanning probes a system for open ports and services, often as reconnaissance before a deeper attack.',
      keyTerms: [
        { term: 'MITM', definition: 'Man-in-the-Middle — intercepting and potentially altering communication between two parties.' },
        { term: 'DDoS', definition: 'Distributed Denial of Service — overwhelming a target with traffic from many sources.' },
        { term: 'DNS Spoofing', definition: 'Corrupting DNS records to redirect users to malicious sites.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '2c1',
      question: 'An attacker sends a highly customized email to a company\'s CFO, referencing a recent board meeting and requesting an urgent wire transfer. What type of attack is this?',
      options: ['Mass phishing', 'Spear phishing / Whaling', 'Vishing', 'Smishing'],
      correctIndex: 1,
      explanation: 'This is spear phishing (targeted, customized) targeting a high-ranking executive (CFO), which also makes it whaling. The customization and executive target distinguish it from mass phishing.',
    },
    {
      id: '2c2',
      question: 'Which malware type self-replicates across networks WITHOUT requiring user action?',
      options: ['Virus', 'Trojan', 'Worm', 'Spyware'],
      correctIndex: 2,
      explanation: 'Worms self-replicate and spread across networks by exploiting vulnerabilities, without needing a user to execute a file. Viruses require user action; Trojans disguise as legitimate software.',
    },
    {
      id: '2c3',
      question: 'What is the primary difference between a Script Kiddie and an APT?',
      options: [
        'Script Kiddies use custom tools; APTs use pre-made tools',
        'Script Kiddies are low-skill using others\' tools; APTs are sophisticated, stealthy, long-term operators',
        'There is no difference',
        'Script Kiddies target governments; APTs target individuals',
      ],
      correctIndex: 1,
      explanation: 'Script Kiddies are low-skill, opportunistic attackers using pre-made tools. APTs are highly sophisticated, well-funded, and conduct stealthy, long-term campaigns — often nation-state sponsored.',
    },
  ],
  exam: [
    {
      id: '2e1',
      concept: 'Social Engineering — Phishing variants',
      variants: [
        {
          question: 'An attacker calls an employee pretending to be from the IT helpdesk, asking them to reset their password by visiting a link. What attack is this?',
          options: ['Spear phishing', 'Vishing', 'Smishing', 'Baiting'],
          correctIndex: 1,
        },
        {
          question: 'A targeted email arrives at the CEO of a Fortune 500 company, referencing a real acquisition deal and asking them to review an "attached document." The email is fake. What specific attack type is this?',
          options: ['Mass phishing', 'Whaling', 'Vishing', 'Baiting'],
          correctIndex: 1,
        },
        {
          question: 'An employee receives a text message: "Your package delivery failed. Click here to reschedule: [malicious link]." What social engineering variant is this?',
          options: ['Vishing', 'Smishing', 'Whaling', 'Baiting'],
          correctIndex: 1,
        },
      ],
      feedback: 'Social engineering variants are defined by their CHANNEL and TARGET. Vishing = voice/phone calls. Smishing = SMS text messages. Whaling = targeting high-ranking executives. Spear phishing = targeted, customized emails. Mass phishing = broad, untargeted emails. Identify the channel (email, phone, SMS) and the target (executive, specific person, mass audience) to classify correctly. Re-read the Social Engineering section.',
    },
    {
      id: '2e2',
      concept: 'Malware typologies',
      variants: [
        {
          question: 'A user downloads what appears to be a legitimate PDF reader, but it secretly installs a keylogger. What type of malware is this?',
          options: ['Worm', 'Trojan', 'Ransomware', 'Rootkit'],
          correctIndex: 1,
        },
        {
          question: 'A hospital\'s systems are locked, and attackers demand cryptocurrency payment to restore access. Patient records are encrypted and inaccessible. What malware type is this?',
          options: ['Spyware', 'Ransomware', 'Virus', 'Worm'],
          correctIndex: 1,
        },
        {
          question: 'Malware embeds itself deep in the OS kernel, hiding its processes and files from standard detection tools, maintaining persistent access. What is this?',
          options: ['Rootkit', 'Trojan', 'Worm', 'Adware'],
          correctIndex: 0,
        },
      ],
      feedback: 'Each malware type has a signature behavior. Trojan = disguised as legitimate software with a hidden payload. Ransomware = encrypts files and demands payment. Rootkit = hides deep in the OS for persistent, stealthy access. Worm = self-replicates across networks. Spyware = covertly monitors activity. Match the BEHAVIOR described to the malware type. Re-read the Malware Typologies section.',
    },
    {
      id: '2e3',
      concept: 'Network Layer Attacks',
      variants: [
        {
          question: 'An attacker positions themselves between a user and a banking website, intercepting and altering transaction details in real-time. What attack is this?',
          options: ['DDoS', 'Man-in-the-Middle (MITM)', 'DNS Spoofing', 'Port Scanning'],
          correctIndex: 1,
        },
        {
          question: 'A website becomes unreachable because thousands of compromised machines flood it with requests simultaneously. What attack is this?',
          options: ['MITM', 'DDoS', 'Spear phishing', 'Rootkit'],
          correctIndex: 1,
        },
        {
          question: 'An attacker corrupts a DNS server\'s cache so that users visiting "bank.com" are redirected to a malicious clone site. What attack is this?',
          options: ['DNS Spoofing', 'Vishing', 'Ransomware', 'Baiting'],
          correctIndex: 0,
        },
      ],
      feedback: 'Network attacks target data in transit and service availability. MITM = intercepting/altering communication between two parties (defeated by TLS). DDoS = overwhelming a target with traffic from many sources (botnet). DNS Spoofing = corrupting DNS records to redirect users. Port scanning = probing for open ports (reconnaissance). Identify what the attacker is doing to the network traffic or service. Re-read the Network Layer Attacks section.',
    },
    {
      id: '2e4',
      concept: 'Threat Actor Motivation',
      variants: [
        {
          question: 'A group defaces a corporation\'s website and leaks internal emails to protest the company\'s environmental practices. What type of threat actor is this?',
          options: ['Script Kiddie', 'Hacktivist', 'APT', 'Organized Cybercriminal'],
          correctIndex: 1,
        },
        {
          question: 'A well-funded group spends 8 months undetected inside a defense contractor\'s network, slowly exfiltrating classified military designs. What type of threat actor is this?',
          options: ['Script Kiddie', 'Hacktivist', 'APT (Advanced Persistent Threat)', 'Opportunistic attacker'],
          correctIndex: 2,
        },
        {
          question: 'A group operates a ransomware-as-a-service platform, splitting profits with affiliates who deploy their malware. What type of threat actor is this?',
          options: ['APT', 'Hacktivist', 'Organized Cybercriminal', 'Script Kiddie'],
          correctIndex: 2,
        },
      ],
      feedback: 'Motivation and capability define the threat actor. Hacktivists = political/ideological motivation (protest, defacement, leaks). APTs = stealthy, long-term, well-funded, often nation-state (targeting infrastructure, IP, defense). Organized Cybercriminals = financial gain, structured like businesses (ransomware, fraud). Script Kiddies = low-skill, opportunistic, using others\' tools. Match the motivation and sophistication to the actor type. Re-read the Threat Actor Categories section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Log Parser for Unauthorized Access',
      description: 'Create a local Python script that parses authentication log files, identifies failed login attempts, and flags potential brute-force attacks by IP.',
      code: `# log_parser.py
# Cyber Academy — Unit 2 Portfolio Lab
# Parse auth logs and detect brute-force patterns

import re
from collections import defaultdict

LOG_FILE = "auth.log"
FAILED_PATTERN = re.compile(
    r'(\\w+ \\d+ \\d+:\\d+:\\d+).*Failed password.*from (\\d+\\.\\d+\\.\\d+\\.\\d+)'
)

def parse_logs(filename):
    failed_by_ip = defaultdict(int)
    with open(filename) as f:
        for line in f:
            match = FAILED_PATTERN.search(line)
            if match:
                ip = match.group(2)
                failed_by_ip[ip] += 1
    return failed_by_ip

def detect_brute_force(failed_by_ip, threshold=10):
    suspects = {ip: count for ip, count in failed_by_ip.items() if count >= threshold}
    return suspects

if __name__ == "__main__":
    # Simulated log data for demo
    sample_logs = [
        "Jan 01 10:00:01 sshd: Failed password for root from 192.168.1.50",
        "Jan 01 10:00:02 sshd: Failed password for root from 192.168.1.50",
        "Jan 01 10:00:03 sshd: Failed password for admin from 10.0.0.5",
    ]
    with open("auth.log", "w") as f:
        f.write("\\n".join(sample_logs))

    results = parse_logs(LOG_FILE)
    print("Failed login attempts by IP:")
    for ip, count in results.items():
        print(f"  {ip}: {count} failures")

    suspects = detect_brute_force(results, threshold=2)
    if suspects:
        print("\\n[ALERT] Potential brute-force attack from:")
        for ip, count in suspects.items():
            print(f"  -> {ip} ({count} failed attempts)")

# Run: python log_parser.py`,
    },
    linkedin: {
      copy: "Just crushed Unit 2 of Cyber Academy — Common Threats & Attacks! I can now distinguish threat actors (Script Kiddies vs APTs vs Hacktivists vs Organized Cybercriminals), classify malware (viruses, worms, trojans, ransomware, rootkits), identify social engineering variants (phishing, spear phishing, vishing, smishing, whaling), and recognize network-layer attacks (MITM, DDoS, DNS spoofing). Knowledge is the first line of defense! 🛡️",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#ThreatActors', '#Malware', '#SocialEngineering'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Complete the Mastercard Cybersecurity Virtual Experience Program on Forage to gain hands-on analyst experience identifying threats and analyzing security incidents.',
      program: 'Mastercard Cybersecurity Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 3 — Tools & Technologies
// ============================================================================
const unit3: Unit = {
  id: 3,
  title: 'Tools & Technologies',
  subtitle: 'Firewalls, IDS/IPS, SIEM & Network Analysis',
  domainMapping: 'Domain 4 — Networking (Firewalls, IDS/IPS, SIEM log aggregation systems, Wireshark packet fundamentals, Port Scanning)',
  icon: 'terminal',
  syllabus: [
    {
      heading: 'Firewalls',
      body: 'A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization\'s security policies. Its primary goal is to establish a barrier between a trusted internal network and untrusted external networks (like the internet). Firewalls operate using rule sets — allow/deny decisions based on IP addresses, ports, protocols, and sometimes application-level data. Traditional packet-filtering firewalls inspect headers only. Stateful firewalls track connection states, allowing return traffic for established connections. Next-Generation Firewalls (NGFW) add deep packet inspection, intrusion prevention, and application awareness. Firewalls are a first line of defense, but not a complete solution — they must be part of a defense-in-depth strategy.',
      keyTerms: [
        { term: 'Packet Filtering', definition: 'Inspecting packet headers (IP, port, protocol) to allow or deny traffic.' },
        { term: 'Stateful Inspection', definition: 'Tracking connection states to allow legitimate return traffic.' },
        { term: 'NGFW', definition: 'Next-Generation Firewall — adds deep packet inspection, IPS, and app awareness.' },
      ],
    },
    {
      heading: 'IDS vs IPS',
      body: 'An Intrusion Detection System (IDS) monitors network or system activity for malicious behavior and generates ALERTS when suspicious activity is detected — but it does not block traffic. It is passive, like a security camera. An Intrusion Prevention System (IPS) goes further: it actively BLOCKS or drops malicious traffic in real-time. It is active, like a security guard. IDS is useful when you want to observe without disrupting (e.g., in a sensitive environment where false positives could cause outages). IPS is better when immediate action is needed. Both use signature-based detection (known attack patterns) and anomaly-based detection (deviations from normal behavior). Many modern NGFWs integrate IPS functionality directly.',
      keyTerms: [
        { term: 'IDS', definition: 'Intrusion Detection System — monitors and alerts, but does not block.' },
        { term: 'IPS', definition: 'Intrusion Prevention System — actively blocks malicious traffic.' },
        { term: 'Signature-based Detection', definition: 'Matching traffic against known attack patterns.' },
        { term: 'Anomaly-based Detection', definition: 'Flagging deviations from established normal behavior baselines.' },
      ],
    },
    {
      heading: 'SIEM — Security Information & Event Management',
      body: 'A SIEM is a centralized platform that aggregates, correlates, and analyzes log data from across an organization\'s entire IT infrastructure — firewalls, servers, endpoints, applications, cloud services. Its power comes from CORRELATION: individually, a failed login on one server might be noise, but when correlated with a port scan from the same IP 5 minutes later, it becomes a potential attack pattern. SIEMs provide real-time alerting, historical analysis, and compliance reporting. Key functions include log collection (from many sources), normalization (converting different log formats to a common schema), correlation (linking related events), and alerting (notifying analysts of suspicious patterns). SIEMs are the central nervous system of a Security Operations Center (SOC).',
      keyTerms: [
        { term: 'Log Aggregation', definition: 'Collecting logs from many sources into a central repository.' },
        { term: 'Correlation', definition: 'Linking related events across systems to identify attack patterns.' },
        { term: 'SOC', definition: 'Security Operations Center — team that monitors and responds to threats.' },
      ],
    },
    {
      heading: 'Wireshark & Packet Analysis',
      body: 'Wireshark is the world\'s most widely used network protocol analyzer. It captures network traffic in real-time and displays it at the packet level, showing every byte of every conversation. Analysts use it to troubleshoot network issues, inspect for malicious traffic, and understand protocol behavior. Key concepts: packets are the fundamental unit of network communication; each packet has headers (metadata like source/destination IP, ports, protocol) and payload (the actual data). Wireshark can filter traffic using display filters (e.g., "http" shows only HTTP traffic, "ip.addr == 192.168.1.1" shows traffic to/from a specific IP). Being able to read packet captures (pcaps) is a fundamental analyst skill — it reveals what is actually happening on the wire, not what logs claim.',
      keyTerms: [
        { term: 'Packet', definition: 'A unit of data transmitted over a network, with headers and payload.' },
        { term: 'Pcap', definition: 'Packet Capture — a file containing recorded network traffic.' },
        { term: 'Display Filter', definition: 'Wireshark syntax to filter which packets are shown (e.g., "tcp.port == 443").' },
      ],
    },
    {
      heading: 'Port Scanning',
      body: 'Port scanning is the process of probing a target system for open network ports and the services running on them. It is a reconnaissance technique — used by attackers to find entry points and by defenders to audit their own exposure. Common scan types: a TCP SYN scan (half-open) sends SYN packets and waits for responses — an open port responds with SYN-ACK, a closed port with RST. A full connect scan completes the TCP handshake. UDP scans probe for open UDP services (like DNS, SNMP) but are slower and less reliable. Nmap is the industry-standard port scanning tool. Well-known ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3389 (RDP). Every open port is a potential attack surface — defenders must know what is exposed and why.',
      keyTerms: [
        { term: 'Nmap', definition: 'The industry-standard network scanning and discovery tool.' },
        { term: 'SYN Scan', definition: 'A half-open TCP scan that does not complete the handshake — stealthier.' },
        { term: 'Attack Surface', definition: 'The sum of all points where an attacker could attempt entry.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '3c1',
      question: 'What is the key difference between an IDS and an IPS?',
      options: [
        'IDS uses signatures; IPS uses anomalies',
        'IDS alerts on threats; IPS actively blocks them',
        'IDS is hardware; IPS is software',
        'There is no difference',
      ],
      correctIndex: 1,
      explanation: 'IDS (Intrusion Detection System) monitors and ALERTS but does not block — it is passive. IPS (Intrusion Prevention System) actively BLOCKS malicious traffic in real-time — it is active.',
    },
    {
      id: '3c2',
      question: 'A SIEM detects that 50 failed logins from one IP were followed by a successful login, then a large data transfer. What SIEM capability made this detection possible?',
      options: ['Log aggregation', 'Correlation', 'Encryption', 'Port scanning'],
      correctIndex: 1,
      explanation: 'Correlation is the SIEM\'s ability to link related events across systems — failed logins + successful login + data exfiltration form an attack pattern when correlated together.',
    },
    {
      id: '3c3',
      question: 'In Wireshark, which display filter would show only HTTPS traffic?',
      options: ['http', 'tcp.port == 443', 'https', 'port 80'],
      correctIndex: 1,
      explanation: 'HTTPS runs over port 443. The Wireshark display filter "tcp.port == 443" shows all TCP traffic on port 443, which is HTTPS traffic.',
    },
  ],
  exam: [
    {
      id: '3e1',
      concept: 'IDS vs IPS',
      variants: [
        {
          question: 'A security device monitors network traffic and sends alerts when it detects a known attack signature, but does not interfere with the traffic. What is this device?',
          options: ['IPS', 'IDS', 'Firewall', 'SIEM'],
          correctIndex: 1,
        },
        {
          question: 'An organization wants to automatically drop malicious packets in real-time as they are detected. Which technology should they deploy?',
          options: ['IDS (passive monitoring)', 'IPS (active blocking)', 'SIEM (log analysis)', 'Wireshark (packet capture)'],
          correctIndex: 1,
        },
        {
          question: 'Why might an organization choose an IDS over an IPS in a sensitive production environment?',
          options: [
            'IDS is always better than IPS',
            'To avoid disrupting legitimate traffic due to false positives',
            'IDS blocks traffic faster than IPS',
            'IDS is required by GDPR',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'IDS = passive, alerts only (like a security camera). IPS = active, blocks traffic (like a security guard). In sensitive environments where false positives could cause outages, IDS is preferred because it observes without disrupting. IPS is better when immediate blocking is needed. Both use signature-based and anomaly-based detection. Re-read the IDS vs IPS section.',
    },
    {
      id: '3e2',
      concept: 'SIEM Correlation',
      variants: [
        {
          question: 'A SIEM receives logs from a firewall, an authentication server, and an endpoint EDR. It links a port scan, a brute-force login, and a malware execution into a single incident. What SIEM capability is this?',
          options: ['Log aggregation', 'Correlation', 'Normalization', 'Encryption'],
          correctIndex: 1,
        },
        {
          question: 'What is the PRIMARY value of a SIEM over individual log files on each device?',
          options: [
            'It stores more data',
            'It correlates events across systems to detect attack patterns invisible in isolated logs',
            'It encrypts all logs',
            'It replaces firewalls',
          ],
          correctIndex: 1,
        },
        {
          question: 'A SIEM converts logs from Cisco, Palo Alto, and Windows into a common format before analysis. What is this process called?',
          options: ['Correlation', 'Normalization', 'Aggregation', 'Filtering'],
          correctIndex: 1,
        },
      ],
      feedback: 'SIEMs have four key functions: Log Aggregation (collecting from many sources), Normalization (converting different formats to a common schema), Correlation (linking related events to detect attack patterns), and Alerting. The PRIMARY value is correlation — linking events across systems that would be invisible in isolated logs. Normalization is the format conversion step. Re-read the SIEM section.',
    },
    {
      id: '3e3',
      concept: 'Wireshark & Packet Analysis',
      variants: [
        {
          question: 'An analyst wants to inspect all traffic going to a specific web server at 10.0.0.5. Which Wireshark display filter should they use?',
          options: ['port 80', 'ip.addr == 10.0.0.5', 'http.server', 'web.traffic'],
          correctIndex: 1,
        },
        {
          question: 'What file format does Wireshark use to save captured network traffic for later analysis?',
          options: ['.log', '.pcap', '.csv', '.json'],
          correctIndex: 1,
        },
        {
          question: 'An analyst captures traffic and sees packets with source port 443 and destination port 54321. What can they infer?',
          options: [
            'The traffic is incoming HTTPS response traffic to a client',
            'The traffic is a DNS query',
            'The traffic is a port scan',
            'The traffic is encrypted email',
          ],
          correctIndex: 0,
        },
      ],
      feedback: 'Wireshark display filters use specific syntax: "ip.addr == X.X.X.X" filters by IP, "tcp.port == 443" filters by port. Captured traffic is saved as .pcap (packet capture) files. Source port 443 means the traffic originates FROM an HTTPS server — it is a response to a client using a high ephemeral port (like 54321). Understanding port directionality helps identify client vs server traffic. Re-read the Wireshark section.',
    },
    {
      id: '3e4',
      concept: 'Port Scanning & Attack Surface',
      variants: [
        {
          question: 'An attacker uses Nmap to perform a TCP SYN scan on a target. Why is this called a "half-open" scan?',
          options: [
            'It only scans half the ports',
            'It sends SYN but does not complete the full TCP handshake',
            'It uses UDP instead of TCP',
            'It only works on half-open networks',
          ],
          correctIndex: 1,
        },
        {
          question: 'A defender runs a port scan on their own server and finds port 3389 open. What service is exposed?',
          options: ['SSH', 'HTTP', 'RDP (Remote Desktop Protocol)', 'DNS'],
          correctIndex: 2,
        },
        {
          question: 'Why is port scanning considered a dual-use tool?',
          options: [
            'It only works on dual processors',
            'Attackers use it for reconnaissance; defenders use it to audit their own attack surface',
            'It scans two ports simultaneously',
            'It is illegal in all contexts',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'A TCP SYN scan is "half-open" because it sends SYN and reads the response (SYN-ACK = open, RST = closed) but does NOT complete the handshake with a final ACK — making it stealthier. Port 3389 = RDP (Remote Desktop Protocol). Port scanning is dual-use: attackers use it for reconnaissance to find entry points, while defenders use it to audit their own exposure and close unnecessary ports. Every open port is attack surface. Re-read the Port Scanning section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Network Port Scanner',
      description: 'Build a Python port scanner that checks a target for common open ports and reports the services running on them.',
      code: `# port_scanner.py
# Cyber Academy — Unit 3 Portfolio Lab
# Scan a target for open ports and identify services

import socket

COMMON_PORTS = {
    22: "SSH",
    80: "HTTP",
    443: "HTTPS",
    3389: "RDP",
    21: "FTP",
    25: "SMTP",
    53: "DNS",
    3306: "MySQL",
}

def scan_port(host, port, timeout=1):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)
            result = s.connect_ex((host, port))
            return result == 0
    except socket.gaierror:
        return False

def scan_host(host):
    print(f"\\n[SCANNING] {host}")
    print("-" * 40)
    open_ports = []
    for port, service in COMMON_PORTS.items():
        if scan_port(host, port):
            open_ports.append((port, service))
            print(f"  [OPEN]  Port {port:>5} — {service}")
        else:
            print(f"  [CLOSED] Port {port:>5} — {service}")

    print(f"\\n[SUMMARY] {len(open_ports)} open ports on {host}")
    if open_ports:
        print("[SECURITY NOTE] Review exposed services — minimize attack surface")
    return open_ports

if __name__ == "__main__":
    scan_host("127.0.0.1")

# Run: python port_scanner.py`,
    },
    linkedin: {
      copy: "Completed Unit 3 of Cyber Academy — Tools & Technologies! I now understand firewalls (packet filtering, stateful, NGFW), the difference between IDS (alerts) and IPS (blocks), SIEM log aggregation and correlation, Wireshark packet analysis with display filters, and port scanning with Nmap. These are the tools SOC analysts use every day! 🖥️",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#SIEM', '#Wireshark', '#NetworkSecurity'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Practice using SIEM tools and analyzing network traffic in a simulated SOC environment through the Forage platform.',
      program: 'Tata Cybersecurity Analyst Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 4 — Safe Digital Behaviour
// ============================================================================
const unit4: Unit = {
  id: 4,
  title: 'Safe Digital Behaviour',
  subtitle: 'Password Management & Security Awareness',
  domainMapping: 'Domain 2 — Governance (Password management, Social engineering recognition, Acceptable Use Policies)',
  icon: 'lock',
  syllabus: [
    {
      heading: 'Password Security Fundamentals',
      body: 'Passwords remain the most common authentication method — and the most attacked. Strong passwords are long (12+ characters), complex (mix of upper, lower, numbers, symbols), unique (never reused across accounts), and unpredictable (no dictionary words, names, or patterns). Password managers (like Bitwarden, 1Password) solve the human limitation of remembering dozens of unique strong passwords — they generate and store them encrypted, requiring you to remember only one master password. Password reuse is one of the most dangerous behaviors: if one site is breached, attackers use credential stuffing to try those credentials on every other site. Multi-Factor Authentication (MFA) adds a second factor (something you have or something you are), making stolen passwords alone insufficient to breach an account.',
      keyTerms: [
        { term: 'Credential Stuffing', definition: 'Using stolen username/password pairs from one breach to log into other sites.' },
        { term: 'Password Manager', definition: 'A tool that generates, stores, and auto-fills unique strong passwords.' },
        { term: 'MFA', definition: 'Multi-Factor Authentication — requiring a second factor beyond the password.' },
      ],
    },
    {
      heading: 'Recognizing Social Engineering',
      body: 'Social engineering exploits human trust, urgency, and curiosity. To recognize it, watch for these red flags: URGENCY ("Your account will be suspended in 24 hours — act now!"), AUTHORITY ("This is the CEO, I need this done immediately"), UNEXPECTED CONTACT (you did not initiate the interaction), REQUESTS FOR SENSITIVE INFO (passwords, MFA codes, financial data — legitimate organizations never ask for these via email or phone), and SUSPICIOUS LINKS/DOMAINS (slight misspellings like "paypa1.com" instead of "paypal.com"). The golden rule: if something feels off, VERIFY through a separate, trusted channel. Do not click links or provide information based on an unsolicited message — go directly to the official website or app. When in doubt, contact the organization through their official phone number or website.',
      keyTerms: [
        { term: 'Urgency', definition: 'A social engineering tactic pressuring victims to act quickly without thinking.' },
        { term: 'Typosquatting', definition: 'Using misspelled domains (e.g., "paypa1.com") to impersonate legitimate sites.' },
        { term: 'Verification', definition: 'Confirming a request through a separate, trusted channel before acting.' },
      ],
    },
    {
      heading: 'Acceptable Use Policies (AUP)',
      body: 'An Acceptable Use Policy (AUP) is a document defining the rules and guidelines for how an organization\'s IT resources (computers, networks, email, internet) may be used by employees. It sets expectations: what is permitted, what is prohibited, and the consequences of violations. Common AUP provisions include: no personal use of company systems for illegal activities, no downloading of unapproved software, no sharing of credentials, no accessing inappropriate content, and requirements to report security incidents. The AUP is a GOVERNANCE control — it does not prevent attacks technically, but it establishes accountability, sets the legal foundation for disciplinary action, and creates a culture of security awareness. Employees typically sign the AUP during onboarding and periodically re-acknowledge it.',
      keyTerms: [
        { term: 'AUP', definition: 'Acceptable Use Policy — rules governing how organizational IT resources may be used.' },
        { term: 'Governance', definition: 'The framework of policies, procedures, and accountability for security.' },
        { term: 'Accountability', definition: 'The principle that individuals are responsible for their actions on systems.' },
      ],
    },
    {
      heading: 'Secure Browsing & Email Hygiene',
      body: 'Daily digital habits significantly impact security. Secure browsing: look for HTTPS (the padlock icon) — it means traffic is encrypted in transit; avoid clicking unknown links or downloading files from untrusted sites; use privacy-focused browser settings; keep browsers updated. Email hygiene: never open unexpected attachments (they may contain malware); be skeptical of emails requesting sensitive information; hover over links to preview the actual URL before clicking; verify the sender\'s email address (not just the display name). Software updates are critical — they patch known vulnerabilities that attackers actively exploit. Using outdated software is one of the highest-risk behaviors, as attackers scan for unpatched systems. Enable automatic updates wherever possible.',
      keyTerms: [
        { term: 'HTTPS', definition: 'HyperText Transfer Protocol Secure — encrypted web traffic using TLS.' },
        { term: 'Patch Management', definition: 'The process of keeping software updated to fix known vulnerabilities.' },
        { term: 'Email Spoofing', definition: 'Forging the sender address to make an email appear from a trusted source.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '4c1',
      question: 'An attacker steals a database of usernames and passwords from Site A, then tries those same credentials on Site B. What is this attack called?',
      options: ['Brute force', 'Credential stuffing', 'Phishing', 'SQL injection'],
      correctIndex: 1,
      explanation: 'Credential stuffing uses stolen credentials from one breach to attempt logins on other sites, exploiting password reuse. This is why unique passwords per site are critical.',
    },
    {
      id: '4c2',
      question: 'You receive an email claiming your bank account will be suspended in 2 hours unless you "verify your identity" by clicking a link. What red flags are present?',
      options: ['Urgency and request for sensitive info via email', 'Proper grammar', 'HTTPS link', 'Official logo'],
      correctIndex: 0,
      explanation: 'Urgency ("2 hours") and requesting sensitive info via email are classic social engineering red flags. Legitimate banks never ask you to verify identity by clicking email links — go to the bank\'s site directly.',
    },
    {
      id: '4c3',
      question: 'What is the primary purpose of an Acceptable Use Policy (AUP)?',
      options: [
        'To technically block all attacks',
        'To define rules for IT resource use and establish accountability',
        'To replace firewalls',
        'To store user passwords',
      ],
      correctIndex: 1,
      explanation: 'An AUP is a governance document defining how IT resources may be used, setting expectations and accountability. It does not block attacks technically — it creates the policy and legal foundation for secure behavior.',
    },
  ],
  exam: [
    {
      id: '4e1',
      concept: 'Password Security',
      variants: [
        {
          question: 'Which password practice is MOST effective at preventing credential stuffing attacks?',
          options: ['Using long passwords', 'Using a unique password for every account', 'Changing passwords monthly', 'Using special characters'],
          correctIndex: 1,
        },
        {
          question: 'An employee uses the same password "Summer2024!" for their email, banking, and social media. One site is breached. What is the primary risk?',
          options: [
            'The password is too short',
            'Credential stuffing can compromise all three accounts',
            'The password lacks special characters',
            'The password is a dictionary word',
          ],
          correctIndex: 1,
        },
        {
          question: 'What is the single most effective control to protect against compromised passwords?',
          options: ['Longer passwords', 'Multi-Factor Authentication (MFA)', 'Frequent password changes', 'Password complexity rules'],
          correctIndex: 1,
        },
      ],
      feedback: 'Credential stuffing exploits password REUSE — using stolen credentials from one breach on other sites. The best defense is a UNIQUE password per account (use a password manager). Even with unique passwords, MFA is the single most effective control because it makes a stolen password alone insufficient to access the account. Re-read the Password Security Fundamentals section.',
    },
    {
      id: '4e2',
      concept: 'Social Engineering Recognition',
      variants: [
        {
          question: 'An email arrives: "Your Netflix subscription has been suspended. Click here within 1 hour to restore access." The sender is "netflix-support@stream-tv-secure.com". What are the red flags?',
          options: [
            'Urgency (1 hour) and a suspicious/non-official domain',
            'The email mentions Netflix',
            'The email is too short',
            'There are no red flags',
          ],
          correctIndex: 0,
        },
        {
          question: 'You receive a call from someone claiming to be from Microsoft support, saying your PC is infected and they need remote access to fix it. What should you do?',
          options: [
            'Grant remote access immediately',
            'Verify by calling Microsoft through their official number; never grant unsolicited remote access',
            'Ask them for their employee ID and then comply',
            'Give them your password so they can fix it remotely',
          ],
          correctIndex: 1,
        },
        {
          question: 'An email from your "CEO" asks you to urgently purchase gift cards and send the codes, keeping it confidential. What social engineering tactic is being used?',
          options: ['Authority + urgency + secrecy (BEC/CEO fraud)', 'Typosquatting', 'Port scanning', 'Ransomware'],
          correctIndex: 0,
        },
      ],
      feedback: 'Social engineering red flags: URGENCY (act now or else), AUTHORITY (impersonating executives or support), UNEXPECTED CONTACT, REQUESTS FOR SENSITIVE INFO, and SUSPICIOUS DOMAINS. The correct response is always to VERIFY through a separate, trusted channel — call the official number, go to the official website, or confirm in person. Never grant remote access, share credentials, or act on unsolicited urgent requests without verification. Re-read the Recognizing Social Engineering section.',
    },
    {
      id: '4e3',
      concept: 'Acceptable Use Policy',
      variants: [
        {
          question: 'An employee uses their company laptop to download pirated software, which introduces malware to the corporate network. Which policy did they violate?',
          options: ['Incident Response Policy', 'Acceptable Use Policy (AUP)', 'Data Classification Policy', 'Disaster Recovery Policy'],
          correctIndex: 1,
        },
        {
          question: 'What is the PRIMARY purpose of having employees sign an Acceptable Use Policy?',
          options: [
            'To technically prevent all misuse',
            'To establish rules, set expectations, and create accountability for IT resource use',
            'To replace technical security controls',
            'To monitor employee web browsing',
          ],
          correctIndex: 1,
        },
        {
          question: 'Which of the following would MOST likely be prohibited by an organization\'s AUP?',
          options: [
            'Using the company VPN',
            'Sharing your login credentials with a coworker',
            'Sending work emails',
            'Using the company intranet',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'An AUP defines rules for IT resource use and creates accountability — it is a GOVERNANCE control, not a technical one. Downloading unapproved software, sharing credentials, and using company resources for illegal activities are typical AUP violations. The AUP establishes the legal and disciplinary foundation for enforcement. It does not replace technical controls — it complements them. Re-read the Acceptable Use Policy section.',
    },
    {
      id: '4e4',
      concept: 'Secure Browsing & Updates',
      variants: [
        {
          question: 'You visit a website and notice the URL starts with "http://" instead of "https://" and there is no padlock icon. What does this mean?',
          options: [
            'The site is definitely malicious',
            'Traffic to this site is not encrypted, making it vulnerable to interception',
            'The site is faster',
            'The site uses a newer protocol',
          ],
          correctIndex: 1,
        },
        {
          question: 'Why are software updates critical for security?',
          options: [
            'They add new features',
            'They patch known vulnerabilities that attackers actively exploit',
            'They speed up the computer',
            'They are required by law',
          ],
          correctIndex: 1,
        },
        {
          question: 'An email attachment has the filename "Invoice.pdf.exe". What should you do?',
          options: [
            'Open it — it is a PDF',
            'Do not open it — the .exe extension disguised as a PDF is a malware indicator',
            'Forward it to coworkers',
            'Save it to your desktop',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'HTTP (no "s") means traffic is unencrypted and can be intercepted — use HTTPS. Software updates patch known vulnerabilities that attackers actively exploit — delaying updates leaves you exposed. A file named "Invoice.pdf.exe" is NOT a PDF — the real extension is .exe (an executable), disguised to look like a PDF. This is a classic malware delivery technique. Never open unexpected attachments, especially with suspicious extensions. Re-read the Secure Browsing & Email Hygiene section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Password Strength Analyzer',
      description: 'Build a Python tool that analyzes password strength against common policies and checks against a list of breached passwords.',
      code: `# password_analyzer.py
# Cyber Academy — Unit 4 Portfolio Lab
# Analyze password strength and check for common weaknesses

import re

COMMON_PASSWORDS = {"password", "123456", "qwerty", "admin", "letmein", "welcome"}

def analyze_password(password):
    score = 0
    feedback = []

    if len(password) >= 12:
        score += 2
    elif len(password) >= 8:
        score += 1
        feedback.append("Use 12+ characters for better security")
    else:
        feedback.append("CRITICAL: Password too short (min 8 required)")

    if re.search(r'[A-Z]', password): score += 1
    else: feedback.append("Add uppercase letters")

    if re.search(r'[a-z]', password): score += 1
    else: feedback.append("Add lowercase letters")

    if re.search(r'\\d', password): score += 1
    else: feedback.append("Add numbers")

    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password): score += 1
    else: feedback.append("Add special characters")

    if password.lower() in COMMON_PASSWORDS:
        score = 0
        feedback.append("CRITICAL: Password is in common breach lists!")

    if re.search(r'(.)\\1{2,}', password):
        score -= 1
        feedback.append("Avoid repeated characters (aaa, 111)")

    strength = "WEAK" if score <= 2 else "MODERATE" if score <= 4 else "STRONG"
    return {"score": score, "strength": strength, "feedback": feedback}

if __name__ == "__main__":
    test_passwords = ["password", "Summer2024!", "Tr0ub4dour&3", "xK9#mQ2$vL7!pN4"]
    for pwd in test_passwords:
        result = analyze_password(pwd)
        print(f"\\nPassword: {pwd}")
        print(f"  Strength: {result['strength']} (score: {result['score']}/6)")
        for f in result["feedback"]:
            print(f"  -> {f}")

# Run: python password_analyzer.py`,
    },
    linkedin: {
      copy: "Finished Unit 4 of Cyber Academy — Safe Digital Behaviour! I now understand password security (credential stuffing, password managers, MFA), recognizing social engineering red flags (urgency, authority, suspicious domains), Acceptable Use Policies as governance controls, and secure browsing/email hygiene. Security awareness is everyone's responsibility! 🔐",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#PasswordSecurity', '#SocialEngineering', '#SecurityAwareness'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Complete a security awareness training simulation to practice identifying phishing emails and social engineering attempts in a corporate environment.',
      program: 'AIG Cybersecurity Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 5 — Protecting Personal & Organisational Data
// ============================================================================
const unit5: Unit = {
  id: 5,
  title: 'Protecting Personal & Organisational Data',
  subtitle: 'Access Control, IAM & Data Classification',
  domainMapping: 'Domain 3 — Access Control Models / IAM (Least Privilege, Role-Based Access Control, Data Classification, Encryption at rest/in transit)',
  icon: 'key',
  syllabus: [
    {
      heading: 'The Principle of Least Privilege (PoLP)',
      body: 'The Principle of Least Privilege states that every user, process, and system should have only the minimum access rights necessary to perform their legitimate function — nothing more. This limits the blast radius of a compromise: if an account with minimal privileges is breached, the attacker can only access what that account can access. Implementing PoLP means regularly reviewing access rights, removing unnecessary permissions, using just-in-time access (granting elevated privileges only when needed and revoking them after), and separating duties so no single person can complete a sensitive transaction alone. Violations of PoLP are a leading cause of major breaches — when every employee has admin access, one phishing email can compromise the entire organization.',
      keyTerms: [
        { term: 'Least Privilege', definition: 'Granting only the minimum access necessary to perform a task.' },
        { term: 'Blast Radius', definition: 'The scope of damage possible if an account or system is compromised.' },
        { term: 'Just-in-Time Access', definition: 'Granting elevated privileges temporarily, only when needed.' },
      ],
    },
    {
      heading: 'Access Control Models',
      body: 'Access control models define HOW permissions are assigned and managed. Role-Based Access Control (RBAC) is the most common in enterprises — access is assigned to ROLES (e.g., "Manager", "Analyst", "Admin"), and users are placed into roles. This scales well and simplifies management. Discretionary Access Control (DAC) lets data OWNERS decide who can access their resources — flexible but harder to audit. Mandatory Access Control (MAC) uses security labels (e.g., "Confidential", "Secret") enforced by the system — used in military and government settings where strict classification matters. Attribute-Based Access Control (ABAC) makes decisions based on attributes (user department, time of day, location, resource sensitivity) — the most flexible but most complex. Choosing the right model depends on the organization\'s size, regulatory requirements, and risk tolerance.',
      keyTerms: [
        { term: 'RBAC', definition: 'Role-Based Access Control — permissions assigned to roles, users assigned to roles.' },
        { term: 'MAC', definition: 'Mandatory Access Control — system-enforced labels (e.g., Confidential, Secret).' },
        { term: 'ABAC', definition: 'Attribute-Based Access Control — decisions based on user/resource/environment attributes.' },
      ],
    },
    {
      heading: 'Data Classification',
      body: 'Data classification is the process of categorizing data based on its sensitivity and the impact of its compromise. Common classification levels: Public (no restriction — marketing materials, public website), Internal (for employees — internal policies, non-sensitive business data), Confidential (restricted — financial data, customer PII, business plans), and Secret/Restricted (highly sensitive — trade secrets, classified government data, encryption keys). Classification drives protection: public data needs no special controls; confidential data needs encryption, access controls, and audit logging; secret data needs the strongest controls including physical security and compartmentalization. Without classification, organizations either over-protect everything (wasteful) or under-protect sensitive data (dangerous). Classification is the foundation of data governance.',
      keyTerms: [
        { term: 'Public', definition: 'Data with no restriction — disclosure causes no harm.' },
        { term: 'Confidential', definition: 'Restricted data — disclosure could cause significant harm.' },
        { term: 'Data Governance', definition: 'The framework for managing data availability, usability, integrity, and security.' },
      ],
    },
    {
      heading: 'Encryption at Rest vs in Transit',
      body: 'Data exists in two states, and each requires different encryption. Data at REST is stored on disk, in databases, or in backups — protected by full-disk encryption (BitLocker, FileVault), database-level encryption (TDE), or file-level encryption. If a laptop or backup tape is stolen, encryption at rest renders the data unreadable without the key. Data in TRANSIT is moving across a network — protected by TLS/HTTPS (web traffic), IPsec (VPN tunnels), and SSH (remote administration). Without encryption in transit, data can be intercepted by a Man-in-the-Middle attack. Both are essential: encrypting data at rest but not in transit leaves it vulnerable during transfer; encrypting in transit but not at rest leaves it vulnerable when stored. Defense-in-depth means encrypting in BOTH states.',
      keyTerms: [
        { term: 'Encryption at Rest', definition: 'Encrypting stored data (disk, database, backups) to protect against physical theft.' },
        { term: 'Encryption in Transit', definition: 'Encrypting data as it moves across networks (TLS, IPsec, SSH).' },
        { term: 'TDE', definition: 'Transparent Data Encryption — database-level encryption for data at rest.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '5c1',
      question: 'A junior developer is given full admin access to the production database "just in case." Which security principle is violated?',
      options: ['Defense in Depth', 'Principle of Least Privilege', 'Separation of Duties', 'Non-repudiation'],
      correctIndex: 1,
      explanation: 'Giving a junior developer full admin access "just in case" violates the Principle of Least Privilege — they should have only the minimum access needed for their role.',
    },
    {
      id: '5c2',
      question: 'In an organization using RBAC, a new employee joins as a "Financial Analyst." How should their access be configured?',
      options: [
        'Assign all permissions individually',
        'Assign them the "Financial Analyst" role, which inherits pre-defined permissions',
        'Give them admin access',
        'No access until they request each resource',
      ],
      correctIndex: 1,
      explanation: 'In RBAC, access is assigned to roles. The new employee is placed in the "Financial Analyst" role, which already has the pre-defined permissions for that position. This is the efficiency of RBAC.',
    },
    {
      id: '5c3',
      question: 'A company encrypts its database (at rest) but transmits data to the web app over plain HTTP. What is the risk?',
      options: [
        'Data is safe — database encryption is enough',
        'Data in transit is unencrypted and can be intercepted by a MITM attack',
        'The database will be slower',
        'No risk — HTTP is secure',
      ],
      correctIndex: 1,
      explanation: 'Encryption at rest protects stored data, but transmitting over HTTP means data in transit is unencrypted and vulnerable to interception (MITM). Both states must be encrypted for defense-in-depth.',
    },
  ],
  exam: [
    {
      id: '5e1',
      concept: 'Principle of Least Privilege',
      variants: [
        {
          question: 'An intern is given domain administrator credentials so they can fix a printer issue. After the task, the credentials are not revoked. What principle is violated?',
          options: ['Separation of Duties', 'Principle of Least Privilege', 'Defense in Depth', 'Non-repudiation'],
          correctIndex: 1,
        },
        {
          question: 'A company implements just-in-time access: admins request elevated privileges, use them for a specific task, then the privileges auto-expire. What principle does this enforce?',
          options: ['Principle of Least Privilege', 'Data Classification', 'Non-repudiation', 'Availability'],
          correctIndex: 0,
        },
        {
          question: 'Why does violating Least Privilege increase the "blast radius" of a breach?',
          options: [
            'It makes the network faster',
            'Compromised accounts with excessive privileges give attackers broader access',
            'It violates GDPR',
            'It reduces the number of logs',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Least Privilege means minimum access for the task — nothing more. Giving an intern domain admin credentials, or failing to revoke elevated access, violates this principle. Just-in-time access (temporary, auto-expiring privileges) enforces it. Excessive privileges increase blast radius: if that account is compromised, the attacker gets all its permissions. Regularly review and reduce access rights. Re-read the Principle of Least Privilege section.',
    },
    {
      id: '5e2',
      concept: 'Access Control Models (RBAC, MAC, DAC, ABAC)',
      variants: [
        {
          question: 'A hospital assigns doctors, nurses, and administrators different access levels based on their job roles. Doctors can view all patient records; nurses can view assigned patients only. Which access control model is this?',
          options: ['MAC (Mandatory)', 'RBAC (Role-Based)', 'DAC (Discretionary)', 'ABAC (Attribute-Based)'],
          correctIndex: 1,
        },
        {
          question: 'A military system requires users to have a "Secret" clearance level AND the data must be labeled "Secret" for access. The system enforces this automatically. Which model is this?',
          options: ['RBAC', 'MAC (Mandatory Access Control)', 'DAC', 'ABAC'],
          correctIndex: 1,
        },
        {
          question: 'A system grants access based on the user\'s department, the time of day, and their current location (office vs remote). Which access control model is this?',
          options: ['RBAC', 'MAC', 'DAC', 'ABAC (Attribute-Based Access Control)'],
          correctIndex: 3,
        },
      ],
      feedback: 'RBAC = permissions assigned to ROLES, users placed in roles (most common in enterprises). MAC = system-enforced security labels/clearance levels (military/government). DAC = data owners decide access (flexible, harder to audit). ABAC = decisions based on multiple attributes (user, resource, environment — most flexible, most complex). Match the decision-making mechanism to the model. Re-read the Access Control Models section.',
    },
    {
      id: '5e3',
      concept: 'Data Classification',
      variants: [
        {
          question: 'A company\'s marketing brochure is published on their public website. What data classification level applies?',
          options: ['Confidential', 'Internal', 'Public', 'Secret'],
          correctIndex: 2,
        },
        {
          question: 'A hospital stores patient medical records. If these were exposed, it would violate HIPAA and harm patients. What classification should apply?',
          options: ['Public', 'Internal', 'Confidential (or higher)', 'No classification needed'],
          correctIndex: 2,
        },
        {
          question: 'Why is data classification important before implementing security controls?',
          options: [
            'It is required by all firewalls',
            'It determines the appropriate level of protection — over-protecting everything is wasteful, under-protecting sensitive data is dangerous',
            'It speeds up the network',
            'It replaces encryption',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Classification levels: Public (no harm if disclosed — marketing materials), Internal (employee-only, low harm), Confidential (restricted — significant harm if disclosed, e.g., PII, financial data), Secret (severe harm — trade secrets, classified data). Classification drives protection: you apply the strongest controls to the most sensitive data. Without classification, you either waste resources over-protecting public data or dangerously under-protect sensitive data. Re-read the Data Classification section.',
    },
    {
      id: '5e4',
      concept: 'Encryption at Rest vs in Transit',
      variants: [
        {
          question: 'A company uses TLS for all web traffic and SSH for server administration, but stores customer data in an unencrypted database. What is the risk?',
          options: [
            'Data in transit is protected, but data at rest is vulnerable if the database or backups are stolen',
            'No risk — TLS is sufficient',
            'The web traffic will be slower',
            'SSH is not needed',
          ],
          correctIndex: 0,
        },
        {
          question: 'A stolen laptop contains unencrypted customer PII. Which encryption strategy would have prevented the breach?',
          options: ['Encryption in transit (TLS)', 'Encryption at rest (full-disk encryption)', 'Port scanning', 'Firewall rules'],
          correctIndex: 1,
        },
        {
          question: 'An organization wants defense-in-depth for a sensitive database. Which combination provides the best protection?',
          options: [
            'Encryption at rest only',
            'Encryption in transit only',
            'Both encryption at rest AND in transit, plus access controls and audit logging',
            'No encryption — just a strong password',
          ],
          correctIndex: 2,
        },
      ],
      feedback: 'Data at REST (stored on disk/database/backups) needs encryption at rest (full-disk, TDE). Data in TRANSIT (moving across networks) needs encryption in transit (TLS, SSH, IPsec). A stolen laptop with unencrypted data is an at-rest failure. Defense-in-depth means BOTH: encrypt at rest AND in transit, plus access controls and audit logging. Encrypting only one state leaves the other vulnerable. Re-read the Encryption at Rest vs in Transit section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Data Classification & Encryption Validator',
      description: 'Build a Python tool that classifies data samples and validates whether appropriate encryption controls are applied based on classification level.',
      code: `# data_classifier.py
# Cyber Academy — Unit 5 Portfolio Lab
# Classify data and validate encryption controls

CLASSIFICATION_RULES = {
    "Public": {
        "examples": ["Marketing brochure", "Press release", "Public website"],
        "requires_encryption_rest": False,
        "requires_encryption_transit": False,
    },
    "Internal": {
        "examples": ["Internal policies", "Org chart", "Non-sensitive emails"],
        "requires_encryption_rest": False,
        "requires_encryption_transit": True,
    },
    "Confidential": {
        "examples": ["Customer PII", "Financial records", "Source code"],
        "requires_encryption_rest": True,
        "requires_encryption_transit": True,
    },
    "Secret": {
        "examples": ["Encryption keys", "Trade secrets", "Classified data"],
        "requires_encryption_rest": True,
        "requires_encryption_transit": True,
    },
}

def validate_controls(classification, encrypted_rest, encrypted_transit):
    rules = CLASSIFICATION_RULES[classification]
    issues = []
    if rules["requires_encryption_rest"] and not encrypted_rest:
        issues.append("FAIL: Encryption at rest required but not applied")
    if rules["requires_encryption_transit"] and not encrypted_transit:
        issues.append("FAIL: Encryption in transit required but not applied")
    if not issues:
        issues.append("PASS: All required controls in place")
    return issues

# Test cases
test_data = [
    ("Customer SSN Database", "Confidential", True, True),
    ("Marketing Flyer", "Public", False, False),
    ("Internal HR Policy", "Internal", False, False),
    ("API Keys Vault", "Secret", True, False),  # Missing transit encryption!
]

for name, cls, enc_rest, enc_transit in test_data:
    print(f"\\n[{name}]")
    print(f"  Classification: {cls}")
    print(f"  Encrypted at rest: {enc_rest}")
    print(f"  Encrypted in transit: {enc_transit}")
    for issue in validate_controls(cls, enc_rest, enc_transit):
        print(f"  -> {issue}")

# Run: python data_classifier.py`,
    },
    linkedin: {
      copy: "Completed Unit 5 of Cyber Academy — Protecting Personal & Organisational Data! I now understand the Principle of Least Privilege (minimizing blast radius), access control models (RBAC, MAC, DAC, ABAC), data classification (Public, Internal, Confidential, Secret), and encryption at rest vs in transit. Protecting data is about applying the RIGHT controls based on sensitivity! 🔑",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#AccessControl', '#DataClassification', '#Encryption'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Practice implementing access controls and data classification policies in a simulated enterprise environment on Forage.',
      program: 'ANZ Cybersecurity Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 6 — Cybersecurity in the Workplace
// ============================================================================
const unit6: Unit = {
  id: 6,
  title: 'Cybersecurity in the Workplace',
  subtitle: 'Governance, Compliance & Physical Security',
  domainMapping: 'Domain 2 — Governance & Compliance (Asset Management, Risk Assessments, NDAs, physical security controls)',
  icon: 'building',
  syllabus: [
    {
      heading: 'Asset Management',
      body: 'Asset management is the process of identifying, tracking, and managing all hardware, software, and data assets an organization owns. You cannot protect what you do not know you have. An asset inventory includes servers, laptops, mobile devices, software licenses, cloud instances, and data repositories. Each asset should have an identified owner, a classification level, and documented security controls. Shadow IT — systems used without IT department knowledge — is a major risk because these assets are often unpatched, unmonitored, and unprotected. Asset management enables vulnerability management (you need to know what you have to patch it), incident response (knowing what was affected), and compliance (proving controls are in place). Automated discovery tools help maintain accurate inventories in dynamic environments.',
      keyTerms: [
        { term: 'Asset Inventory', definition: 'A comprehensive list of all hardware, software, and data assets.' },
        { term: 'Shadow IT', definition: 'Systems or software used without IT department knowledge or approval.' },
        { term: 'Asset Owner', definition: 'The individual accountable for a specific asset\'s security and management.' },
      ],
    },
    {
      heading: 'Risk Assessments',
      body: 'A risk assessment identifies, analyzes, and evaluates risks to an organization\'s assets. The process: identify assets and their value, identify threats (who could attack) and vulnerabilities (weaknesses that could be exploited), determine likelihood and impact, and calculate risk (Risk = Threat × Vulnerability × Impact). Risks are then prioritized and treated through one of four strategies: MITIGATE (apply controls to reduce risk — e.g., install a firewall), TRANSFER (shift risk to a third party — e.g., cyber insurance), ACCEPT (acknowledge the risk but choose not to act — for low-impact risks), or AVOID (stop the activity causing the risk). Risk assessments are not one-time — they must be repeated regularly as threats, assets, and environments change. They form the basis for security investment decisions.',
      keyTerms: [
        { term: 'Risk', definition: 'The potential for loss when a threat exploits a vulnerability.' },
        { term: 'Vulnerability', definition: 'A weakness that could be exploited by a threat.' },
        { term: 'Risk Mitigation', definition: 'Applying controls to reduce the likelihood or impact of a risk.' },
      ],
    },
    {
      heading: 'Non-Disclosure Agreements (NDAs) & Compliance',
      body: 'An NDA is a legal contract that requires parties to keep specified information confidential. In cybersecurity, NDAs protect trade secrets, customer data, security configurations, and vulnerability information from being shared with unauthorized parties. Employees, contractors, and vendors typically sign NDAs before accessing sensitive systems. Compliance means adhering to laws, regulations, and industry standards — GDPR (data privacy in EU), HIPAA (healthcare data in the US), PCI-DSS (payment card data), SOX (financial reporting). Non-compliance can result in massive fines, legal action, and reputational damage. Security controls exist not just to prevent attacks but to demonstrate compliance — auditors require evidence that controls are implemented and operating effectively. NDAs and compliance frameworks together form the legal and regulatory layer of cybersecurity governance.',
      keyTerms: [
        { term: 'NDA', definition: 'Non-Disclosure Agreement — a legal contract requiring parties to keep information confidential.' },
        { term: 'PCI-DSS', definition: 'Payment Card Industry Data Security Standard — governs payment card data.' },
        { term: 'Compliance', definition: 'Adhering to laws, regulations, and industry standards for data protection.' },
      ],
    },
    {
      heading: 'Physical Security Controls',
      body: 'Cybersecurity is not only digital — physical security controls protect the physical assets that house digital systems. Key controls include: access badges and biometric scanners (restricting who can enter facilities), security cameras (deterrence and forensic evidence), locks and secure rooms (protecting servers and networking equipment), visitor logs and escort policies (tracking non-employees), and environmental controls (fire suppression, HVAC, power backup for data centers). A critical concept is tailgating — when an unauthorized person follows an authorized person through a secure door. Even the best digital defenses fail if an attacker can physically access a server or plug a malicious USB into a workstation. Physical and digital security must work together — a gap in one undermines the other.',
      keyTerms: [
        { term: 'Tailgating', definition: 'An unauthorized person following an authorized person through a secure door.' },
        { term: 'Badge Access', definition: 'Using ID badges to control and log physical entry to facilities.' },
        { term: 'Environmental Controls', definition: 'Fire suppression, HVAC, and power systems protecting data centers.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '6c1',
      question: 'An employee uses a personal cloud storage account to share work documents because the corporate tool is "too slow." What risk does this create?',
      options: ['Shadow IT — unmanaged, unmonitored, and unprotected assets', 'Improved productivity', 'Better security', 'No risk'],
      correctIndex: 0,
      explanation: 'This is Shadow IT — systems used without IT approval. These assets are unmanaged, unmonitored, often unpatched, and outside security controls, creating significant risk.',
    },
    {
      id: '6c2',
      question: 'A risk assessment identifies a vulnerability with high likelihood and high impact. Which risk treatment strategy is MOST appropriate?',
      options: ['Accept', 'Mitigate (apply controls to reduce the risk)', 'Ignore', 'Transfer only'],
      correctIndex: 1,
      explanation: 'High likelihood + high impact = high risk. The appropriate response is to MITIGATE by applying controls to reduce the likelihood or impact. Accepting is for low risks; transferring shifts risk but does not reduce it.',
    },
    {
      id: '6c3',
      question: 'An unauthorized person follows an employee through a secure door by walking closely behind them. What is this called?',
      options: ['Phishing', 'Tailgating', 'Vishing', 'Baiting'],
      correctIndex: 1,
      explanation: 'Tailgating (or piggybacking) is when an unauthorized person follows an authorized person through a secure door. It exploits human politeness — the employee holds the door. Awareness training and badge enforcement prevent this.',
    },
  ],
  exam: [
    {
      id: '6e1',
      concept: 'Asset Management & Shadow IT',
      variants: [
        {
          question: 'A marketing team subscribes to an unapproved SaaS tool using personal credit cards to manage customer contacts. IT is unaware. What risk does this pose?',
          options: [
            'No risk — it improves productivity',
            'Shadow IT: customer data is outside corporate controls, unmonitored, and potentially non-compliant',
            'It reduces IT workload',
            'It improves data classification',
          ],
          correctIndex: 1,
        },
        {
          question: 'Why is an accurate asset inventory a prerequisite for vulnerability management?',
          options: [
            'It speeds up the network',
            'You cannot patch or protect assets you do not know exist',
            'It is required by NDAs',
            'It replaces firewalls',
          ],
          correctIndex: 1,
        },
        {
          question: 'A company discovers 200 unpatched servers that were not in any inventory. What failure allowed this?',
          options: ['Poor asset management', 'Weak encryption', 'No NDA', 'Missing physical locks'],
          correctIndex: 0,
        },
      ],
      feedback: 'Asset management is the foundation — you cannot protect what you do not know you have. Shadow IT (unapproved systems) creates risk because those assets are unmanaged, unmonitored, unpatched, and outside security controls. An accurate asset inventory is a prerequisite for vulnerability management, incident response, and compliance. Automated discovery tools help maintain inventories. Re-read the Asset Management section.',
    },
    {
      id: '6e2',
      concept: 'Risk Assessment & Treatment',
      variants: [
        {
          question: 'A risk assessment finds a medium-likelihood, high-impact risk. The company decides to purchase cyber insurance to cover potential losses. Which risk treatment strategy is this?',
          options: ['Mitigate', 'Transfer', 'Accept', 'Avoid'],
          correctIndex: 1,
        },
        {
          question: 'A company identifies a low-likelihood, low-impact risk from an outdated printer. They decide the cost of fixing it exceeds the potential loss and document their decision. Which treatment is this?',
          options: ['Mitigate', 'Transfer', 'Accept', 'Avoid'],
          correctIndex: 2,
        },
        {
          question: 'Risk = Threat × Vulnerability × Impact. If a critical vulnerability has high threat likelihood and high impact, what is the appropriate treatment?',
          options: ['Accept the risk', 'Mitigate by applying controls to reduce likelihood and/or impact', 'Ignore it', 'Transfer to employees'],
          correctIndex: 1,
        },
      ],
      feedback: 'Four risk treatment strategies: MITIGATE (apply controls to reduce risk — firewalls, patches, training), TRANSFER (shift risk to a third party — cyber insurance, outsourcing), ACCEPT (acknowledge but choose not to act — for low risks where fix cost exceeds potential loss), AVOID (stop the activity causing the risk). High likelihood + high impact = mitigate. Low + low = accept. Insurance = transfer. Re-read the Risk Assessments section.',
    },
    {
      id: '6e3',
      concept: 'NDAs & Compliance',
      variants: [
        {
          question: 'A contractor needs access to a company\'s proprietary source code. What legal document should they sign BEFORE receiving access?',
          options: ['An Acceptable Use Policy only', 'A Non-Disclosure Agreement (NDA)', 'A risk assessment', 'A firewall rule'],
          correctIndex: 1,
        },
        {
          question: 'A hospital fails to encrypt patient data and suffers a breach exposing 10,000 records. Which compliance framework\'s requirements were violated?',
          options: ['PCI-DSS', 'HIPAA', 'SOX', 'GDPR only'],
          correctIndex: 1,
        },
        {
          question: 'A company processes credit card payments and stores card numbers. Which compliance standard MUST they adhere to?',
          options: ['HIPAA', 'PCI-DSS', 'SOX', 'NDA'],
          correctIndex: 1,
        },
      ],
      feedback: 'NDAs are legal contracts requiring confidentiality — contractors and employees should sign them before accessing sensitive data. Compliance frameworks: HIPAA = healthcare data (US), PCI-DSS = payment card data, GDPR = personal data privacy (EU), SOX = financial reporting. Non-compliance can result in fines, legal action, and reputational damage. Security controls must not only prevent attacks but demonstrate compliance to auditors. Re-read the NDAs & Compliance section.',
    },
    {
      id: '6e4',
      concept: 'Physical Security Controls',
      variants: [
        {
          question: 'An attacker waits near a company entrance and follows an employee through the secure door before it closes. What attack is this?',
          options: ['Phishing', 'Tailgating', 'Vishing', 'DNS Spoofing'],
          correctIndex: 1,
        },
        {
          question: 'A data center has biometric scanners, badge readers, security cameras, and fire suppression systems. These are examples of what type of control?',
          options: ['Digital access controls', 'Physical security controls', 'Compliance controls', 'Network controls'],
          correctIndex: 1,
        },
        {
          question: 'Why is physical security critical to cybersecurity?',
          options: [
            'It is not — digital security is sufficient',
            'An attacker with physical access to a server can bypass many digital controls',
            'It replaces the need for firewalls',
            'It is only needed for small businesses',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Physical security controls (badges, biometrics, cameras, locks, environmental controls) protect the physical assets housing digital systems. Tailgating is following someone through a secure door — defeated by awareness training and badge enforcement. Physical access can bypass digital controls — an attacker with physical access to a server can plug in a malicious device, steal hard drives, or bypass network controls. Physical and digital security must work together. Re-read the Physical Security Controls section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Risk Assessment Calculator',
      description: 'Build a Python tool that calculates risk scores based on threat likelihood, vulnerability severity, and asset impact, then recommends treatment strategies.',
      code: `# risk_calculator.py
# Cyber Academy — Unit 6 Portfolio Lab
# Calculate risk scores and recommend treatment strategies

def calculate_risk(likelihood, vulnerability, impact):
    """Risk = Threat Likelihood x Vulnerability x Impact (1-5 scale)"""
    risk_score = likelihood * vulnerability * impact
    if risk_score >= 60:
        level = "CRITICAL"
    elif risk_score >= 30:
        level = "HIGH"
    elif risk_score >= 15:
        level = "MEDIUM"
    elif risk_score >= 5:
        level = "LOW"
    else:
        level = "MINIMAL"
    return {"score": risk_score, "level": level}

def recommend_treatment(risk_level):
    treatments = {
        "CRITICAL": "MITIGATE immediately — apply controls to reduce likelihood and impact. Consider TRANSFER via cyber insurance.",
        "HIGH": "MITIGATE — apply controls to reduce risk. Prioritize remediation.",
        "MEDIUM": "MITIGATE or TRANSFER — apply cost-effective controls or transfer via insurance.",
        "LOW": "ACCEPT — document the risk; monitor for changes. Fix if cost is low.",
        "MINIMAL": "ACCEPT — no action needed; document and periodically review.",
    }
    return treatments.get(risk_level, "Review required")

# Risk scenarios
scenarios = [
    ("Unpatched public-facing server", 5, 4, 5),  # High likelihood, high vuln, high impact
    ("Outdated office printer", 2, 2, 1),          # Low everything
    ("Employee password reuse", 4, 3, 4),          # Medium-high
    ("Unencrypted backup tapes offsite", 2, 4, 5), # Low likelihood, high impact
]

print("=" * 60)
print("CYBER ACADEMY — RISK ASSESSMENT CALCULATOR")
print("=" * 60)

for name, threat, vuln, impact in scenarios:
    risk = calculate_risk(threat, vuln, impact)
    treatment = recommend_treatment(risk["level"])
    print(f"\\n[SCENARIO] {name}")
    print(f"  Threat Likelihood: {threat}/5")
    print(f"  Vulnerability:     {vuln}/5")
    print(f"  Impact:            {impact}/5")
    print(f"  Risk Score:        {risk['score']} ({risk['level']})")
    print(f"  Recommendation:    {treatment}")

# Run: python risk_calculator.py`,
    },
    linkedin: {
      copy: "Completed Unit 6 of Cyber Academy — Cybersecurity in the Workplace! I now understand asset management (and the dangers of Shadow IT), risk assessments (identify, analyze, treat: mitigate/transfer/accept/avoid), NDAs and compliance frameworks (GDPR, HIPAA, PCI-DSS), and physical security controls (tailgating prevention, badge access, environmental controls). Security is a governance discipline, not just technology! 🏢",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#RiskAssessment', '#Compliance', '#PhysicalSecurity'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Practice conducting risk assessments and implementing compliance controls in a simulated enterprise environment on Forage.',
      program: 'Commonwealth Bank Cybersecurity Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 7 — Responding to Cybersecurity Incidents
// ============================================================================
const unit7: Unit = {
  id: 7,
  title: 'Responding to Cybersecurity Incidents',
  subtitle: 'Incident Response Lifecycle',
  domainMapping: 'Domain 5 — Security Operations (Incident Response Lifecycle: Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned)',
  icon: 'siren',
  syllabus: [
    {
      heading: 'What is Incident Response?',
      body: 'Incident Response (IR) is a structured approach to handling a security breach or cyberattack. The goal is to manage the incident in a way that limits damage, reduces recovery time and costs, and protects the organization\'s reputation. An incident is any event that violates security policies or threatens information assets — a malware infection, a data breach, a DDoS attack, unauthorized access, or a lost laptop. Without a structured IR process, organizations react chaotically, miss critical steps, and often make the situation worse (e.g., rebooting an infected machine, destroying forensic evidence). A formal Incident Response Plan (IRP) defines roles, responsibilities, procedures, and communication protocols before an incident occurs.',
      keyTerms: [
        { term: 'Incident', definition: 'An event that violates security policies or threatens information assets.' },
        { term: 'IRP', definition: 'Incident Response Plan — documented procedures for handling security incidents.' },
        { term: 'SOC', definition: 'Security Operations Center — the team that detects and responds to incidents.' },
      ],
    },
    {
      heading: 'Phase 1: Preparation',
      body: 'Preparation is the foundation of effective incident response — it happens BEFORE an incident occurs. Key preparation activities: establish an Incident Response Team (IRT) with defined roles (incident commander, analysts, communications, legal), develop and document an Incident Response Plan, create communication templates and contact lists, deploy monitoring and detection tools (SIEM, IDS, EDR), conduct regular training and tabletop exercises (simulated incidents to practice the response), and ensure forensic readiness (tools, procedures, and chain-of-custody documentation). Organizations that skip preparation are forced to figure out their response during a crisis, when time is critical and mistakes are costly. Preparation is measured by how quickly and effectively the team can respond when an incident occurs.',
      keyTerms: [
        { term: 'Tabletop Exercise', definition: 'A simulated incident response practice session to test the IRP.' },
        { term: 'IRT', definition: 'Incident Response Team — the group responsible for handling security incidents.' },
        { term: 'Chain of Custody', definition: 'Documented trail of evidence handling for legal admissibility.' },
      ],
    },
    {
      heading: 'Phase 2: Detection & Analysis',
      body: 'Detection is identifying that an incident has occurred — through SIEM alerts, IDS/IPS signatures, user reports, or external notifications. Analysis is determining the scope, nature, and impact: What type of incident is it? (malware, breach, DDoS) What systems are affected? How did the attacker get in? What data was accessed or exfiltrated? Is the incident ongoing? This phase involves examining logs, analyzing malware, correlating events, and sometimes engaging threat intelligence. A key challenge is alert fatigue — SOC analysts receive thousands of alerts, many false positives, and must triage to identify true incidents. Mean Time to Detect (MTTD) is a critical metric — the faster you detect, the less damage occurs. Detection and analysis continue throughout the incident as new information emerges.',
      keyTerms: [
        { term: 'MTTD', definition: 'Mean Time to Detect — average time to identify a security incident.' },
        { term: 'Alert Fatigue', definition: 'Desensitization to alerts due to high volumes of false positives.' },
        { term: 'Triage', definition: 'Prioritizing incidents based on severity and impact.' },
      ],
    },
    {
      heading: 'Phase 3: Containment, Eradication & Recovery',
      body: 'Containment stops the bleeding — limiting the incident\'s spread and impact. Short-term containment: isolate affected systems (disconnect from network, disable accounts), block malicious IPs/domains. Long-term containment: apply temporary patches, implement monitoring while planning eradication. Containment must be careful — aggressive actions can destroy forensic evidence or alert the attacker. Eradication removes the root cause: delete malware, close vulnerabilities, remove attacker access (backdoors, persistence mechanisms), and rebuild compromised systems from clean images. Recovery restores systems to normal operation: restore from clean backups, verify system integrity, monitor for re-infection, and gradually return systems to production. Mean Time to Respond/Recover (MTTR) measures how quickly the organization can contain and recover.',
      keyTerms: [
        { term: 'Containment', definition: 'Limiting the scope and impact of an incident to prevent further damage.' },
        { term: 'Eradication', definition: 'Removing the root cause — malware, vulnerabilities, and attacker access.' },
        { term: 'MTTR', definition: 'Mean Time to Respond/Recover — average time to contain and restore systems.' },
      ],
    },
    {
      heading: 'Phase 4: Lessons Learned (Post-Incident Review)',
      body: 'Lessons Learned is the most undervalued but most important phase — it happens AFTER the incident is resolved. The team conducts a post-incident review (often called a post-mortem) to answer: What happened? How did we detect it? What worked well in our response? What failed? What should we improve? Were there gaps in our tools, processes, or training? The output is a written report with specific, actionable improvements: updating the IRP, deploying new detection rules, patching vulnerabilities, improving training, adjusting monitoring. Without this phase, organizations repeat the same mistakes. The goal is not to assign blame but to improve — a blameless post-mortem culture encourages honesty and learning. Lessons learned closes the loop, making the organization more resilient for the next incident.',
      keyTerms: [
        { term: 'Post-Mortem', definition: 'A post-incident review to analyze what happened and identify improvements.' },
        { term: 'Blameless Post-Mortem', definition: 'A review culture focused on systemic improvement, not individual blame.' },
        { term: 'Action Items', definition: 'Specific, documented improvements identified during the lessons learned phase.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '7c1',
      question: 'During a security incident, an employee immediately reboots the infected server to "fix it." Why is this problematic?',
      options: [
        'It is the correct response',
        'It can destroy forensic evidence and alert the attacker',
        'It saves time',
        'It improves detection',
      ],
      correctIndex: 1,
      explanation: 'Rebooting can destroy volatile forensic evidence (memory contents, running processes, network connections) and may alert a sophisticated attacker. Containment should be done carefully by the IR team, not by ad-hoc reboots.',
    },
    {
      id: '7c2',
      question: 'Which phase of incident response happens BEFORE an incident occurs?',
      options: ['Detection', 'Containment', 'Preparation', 'Lessons Learned'],
      correctIndex: 2,
      explanation: 'Preparation happens before incidents — establishing the IR team, writing the IRP, deploying tools, and conducting tabletop exercises. Without preparation, response is chaotic and slow.',
    },
    {
      id: '7c3',
      question: 'After an incident is resolved, the team reviews what happened and documents improvements. What is this phase called?',
      options: ['Containment', 'Eradication', 'Lessons Learned (Post-Incident Review)', 'Detection'],
      correctIndex: 2,
      explanation: 'Lessons Learned (post-incident review or post-mortem) happens after resolution. The team analyzes what happened, what worked, what failed, and documents actionable improvements to prevent recurrence.',
    },
  ],
  exam: [
    {
      id: '7e1',
      concept: 'IR Lifecycle — Phase Order',
      variants: [
        {
          question: 'What is the correct order of the Incident Response lifecycle phases?',
          options: [
            'Detection → Preparation → Containment → Recovery',
            'Preparation → Detection → Containment → Eradication → Recovery → Lessons Learned',
            'Containment → Detection → Recovery → Preparation',
            'Recovery → Eradication → Detection → Lessons Learned',
          ],
          correctIndex: 1,
        },
        {
          question: 'A company is hit by ransomware. They first isolate the affected machines, then remove the malware and close the vulnerability, then restore from backups. Which phases does this represent in order?',
          options: [
            'Detection → Recovery → Eradication',
            'Containment → Eradication → Recovery',
            'Recovery → Containment → Eradication',
            'Preparation → Detection → Lessons Learned',
          ],
          correctIndex: 1,
        },
        {
          question: 'Which phase of incident response is focused on identifying that an incident has occurred and determining its scope?',
          options: ['Preparation', 'Detection & Analysis', 'Containment', 'Lessons Learned'],
          correctIndex: 1,
        },
      ],
      feedback: 'The IR lifecycle is: 1) Preparation (before), 2) Detection & Analysis (identify and scope), 3) Containment (stop the spread), 4) Eradication (remove root cause), 5) Recovery (restore systems), 6) Lessons Learned (post-incident review). Isolating machines = containment. Removing malware = eradication. Restoring from backups = recovery. Re-read the IR lifecycle sections in order.',
    },
    {
      id: '7e2',
      concept: 'Preparation Phase',
      variants: [
        {
          question: 'Which activity is part of the Preparation phase of incident response?',
          options: [
            'Restoring systems from backup',
            'Conducting a tabletop exercise to practice the IRP',
            'Removing malware from infected systems',
            'Writing the post-incident report',
          ],
          correctIndex: 1,
        },
        {
          question: 'An organization has no documented IR plan, no defined IR team, and no monitoring tools. An incident occurs. What will be the likely result?',
          options: [
            'Fast, effective response',
            'Chaotic, slow response with missed steps and increased damage',
            'No impact on response quality',
            'Automatic containment',
          ],
          correctIndex: 1,
        },
        {
          question: 'What is the purpose of a chain-of-custody document in incident response?',
          options: [
            'To speed up the network',
            'To maintain a documented trail of evidence handling for legal admissibility',
            'To replace the IR plan',
            'To block malicious traffic',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Preparation happens BEFORE incidents: establishing the IR team, writing the IRP, deploying monitoring tools, conducting tabletop exercises, and ensuring forensic readiness (chain-of-custody documentation). Without preparation, response is chaotic, slow, and misses critical steps. Chain of custody documents evidence handling for legal admissibility. Re-read the Preparation section.',
    },
    {
      id: '7e3',
      concept: 'Containment, Eradication & Recovery',
      variants: [
        {
          question: 'A SOC analyst detects a compromised server actively exfiltrating data. What should be the FIRST action in the containment phase?',
          options: [
            'Reboot the server immediately',
            'Isolate the server from the network to stop data exfiltration',
            'Delete all logs',
            'Wait for the lessons learned phase',
          ],
          correctIndex: 1,
        },
        {
          question: 'After containing an incident, the team removes the malware, deletes attacker backdoors, patches the exploited vulnerability, and rebuilds the server from a clean image. Which phase is this?',
          options: ['Containment', 'Eradication', 'Recovery', 'Detection'],
          correctIndex: 1,
        },
        {
          question: 'During recovery, the team restores systems from clean backups and monitors for re-infection. Why is monitoring important during recovery?',
          options: [
            'To speed up the process',
            'To detect if the attacker returns or if eradication was incomplete',
            'To generate more alerts',
            'It is not important',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Containment = stop the bleeding (isolate affected systems, block malicious traffic). Eradication = remove the root cause (delete malware, close vulnerabilities, remove backdoors, rebuild from clean images). Recovery = restore to normal (restore from backups, verify integrity, monitor for re-infection). Monitoring during recovery is critical because the attacker may return or eradication may have been incomplete. Re-read the Containment, Eradication & Recovery section.',
    },
    {
      id: '7e4',
      concept: 'Lessons Learned',
      variants: [
        {
          question: 'After resolving a major incident, the team holds a meeting to discuss what happened, what worked, what failed, and what to improve. They document action items. What phase is this?',
          options: ['Detection', 'Containment', 'Lessons Learned (Post-Incident Review)', 'Preparation'],
          correctIndex: 2,
        },
        {
          question: 'Why is a "blameless post-mortem" culture important in incident response?',
          options: [
            'It hides who made mistakes',
            'It encourages honesty and systemic improvement without fear of punishment',
            'It speeds up recovery',
            'It is required by law',
          ],
          correctIndex: 1,
        },
        {
          question: 'An organization resolves an incident but skips the Lessons Learned phase. What is the likely consequence?',
          options: [
            'No impact — the incident is over',
            'The same vulnerabilities and failures may cause future incidents',
            'Faster response next time',
            'Reduced costs',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Lessons Learned (post-incident review/post-mortem) happens AFTER resolution: analyze what happened, what worked, what failed, and document actionable improvements. A blameless culture encourages honesty — people report issues without fear, enabling systemic improvement. Skipping this phase means the organization repeats the same mistakes. The output is specific action items: update the IRP, deploy new detection rules, patch vulnerabilities, improve training. Re-read the Lessons Learned section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Incident Response Playbook Generator',
      description: 'Build a Python tool that generates incident response playbooks based on incident type, with step-by-step actions for each IR lifecycle phase.',
      code: `# ir_playbook.py
# Cyber Academy — Unit 7 Portfolio Lab
# Generate incident response playbooks by incident type

PLAYBOOKS = {
    "Ransomware": {
        "Preparation": [
            "Maintain offline/offsite backups",
            "Deploy EDR on all endpoints",
            "Train staff on phishing recognition",
            "Test restore procedures quarterly",
        ],
        "Detection": [
            "Monitor for mass file modification alerts",
            "Check EDR for ransomware signatures",
            "Identify patient zero (first infected machine)",
        ],
        "Containment": [
            "Immediately isolate infected machines from network",
            "Disable compromised accounts",
            "Block known C2 domains/IPs at firewall",
        ],
        "Eradication": [
            "Remove ransomware binary",
            "Delete persistence mechanisms",
            "Patch the exploited vulnerability",
        ],
        "Recovery": [
            "Restore systems from clean offline backups",
            "Verify system integrity",
            "Monitor for re-infection for 30 days",
        ],
        "Lessons Learned": [
            "Document timeline and root cause",
            "Update ransomware playbook",
            "Review backup and detection gaps",
        ],
    },
    "Data Breach": {
        "Preparation": ["Deploy DLP tools", "Implement access logging", "Define breach notification legal requirements"],
        "Detection": ["Analyze SIEM for data exfiltration patterns", "Review access logs for anomalies"],
        "Containment": ["Revoke compromised credentials", "Block exfiltration channels"],
        "Eradication": ["Close the vulnerability", "Remove attacker access"],
        "Recovery": ["Verify data integrity", "Implement additional monitoring"],
        "Lessons Learned": ["Document affected data and individuals", "Review access controls", "Update breach response procedures"],
    },
}

def generate_playbook(incident_type):
    if incident_type not in PLAYBOOKS:
        print(f"No playbook for: {incident_type}")
        return
    print(f"\\n{'='*60}")
    print(f"INCIDENT RESPONSE PLAYBOOK: {incident_type.upper()}")
    print(f"{'='*60}")
    for phase, actions in PLAYBOOKS[incident_type].items():
        print(f"\\n[PHASE] {phase}")
        for i, action in enumerate(actions, 1):
            print(f"  {i}. {action}")

if __name__ == "__main__":
    generate_playbook("Ransomware")
    generate_playbook("Data Breach")

# Run: python ir_playbook.py`,
    },
    linkedin: {
      copy: "Completed Unit 7 of Cyber Academy — Responding to Cybersecurity Incidents! I now understand the complete Incident Response Lifecycle: Preparation (IR plans, tabletop exercises), Detection & Analysis (SIEM, triage, MTTD), Containment (isolate, block), Eradication (remove root cause), Recovery (restore, monitor), and Lessons Learned (blameless post-mortems). Ready to respond, not just react! 🚨",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#IncidentResponse', '#SecurityOperations', '#SOC'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Practice incident response procedures in a simulated SOC environment, including triage, containment, and post-incident analysis on Forage.',
      program: 'Mastercard Cybersecurity Virtual Experience Program',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// UNIT 8 — Future Trends & Careers
// ============================================================================
const unit8: Unit = {
  id: 8,
  title: 'Future Trends & Careers',
  subtitle: 'AI, Quantum & Professional Readiness',
  domainMapping: 'All Domains Comprehensive Revision (AI-driven threat hunting, quantum cryptography shifts, professional interview readiness prep)',
  icon: 'rocket',
  syllabus: [
    {
      heading: 'AI-Driven Threat Hunting & Defense',
      body: 'Artificial Intelligence and Machine Learning are transforming both attack and defense. On the defensive side, AI enables automated threat hunting — analyzing massive datasets to detect anomalies and attack patterns that human analysts would miss. ML models learn normal behavior baselines and flag deviations, reducing alert fatigue by prioritizing true threats. AI-powered SIEMs and EDR platforms correlate events across millions of data points in real-time. On the offensive side, attackers use AI to craft more convincing phishing emails (deepfakes, personalized content at scale), automate vulnerability discovery, and develop polymorphic malware that changes its code to evade signature detection. The future of cybersecurity is an AI arms race — defenders must leverage AI to keep pace with AI-augmented attacks. Understanding AI\'s capabilities and limitations is now a core skill for security professionals.',
      keyTerms: [
        { term: 'Threat Hunting', definition: 'Proactively searching for threats that have evaded existing security controls.' },
        { term: 'Polymorphic Malware', definition: 'Malware that mutates its code to evade signature-based detection.' },
        { term: 'Deepfake', definition: 'AI-generated synthetic media (video/audio) used for social engineering.' },
      ],
    },
    {
      heading: 'Quantum Cryptography & Post-Quantum Security',
      body: 'Quantum computing threatens to break current public-key cryptography (RSA, ECC) that secures internet communications, banking, and digital signatures. A sufficiently powerful quantum computer running Shor\'s algorithm could factor large numbers and solve discrete logarithms — the mathematical problems RSA and ECC rely on. While large-scale quantum computers do not yet exist, the threat is real: attackers are harvesting encrypted data now to decrypt later when quantum computers mature ("harvest now, decrypt later"). Post-Quantum Cryptography (PQC) is the development of new cryptographic algorithms resistant to quantum attacks — NIST has been standardizing PQC algorithms (like CRYSTALS-Kyber for key exchange and CRYSTALS-Dilithium for signatures). Quantum Key Distribution (QKD) uses quantum mechanics to detect eavesdropping on key exchange. Organizations must prepare for the quantum transition by inventorying cryptographic assets and planning migration to PQC.',
      keyTerms: [
        { term: 'PQC', definition: 'Post-Quantum Cryptography — algorithms resistant to quantum computer attacks.' },
        { term: 'Shor\'s Algorithm', definition: 'A quantum algorithm that can break RSA and ECC if run on a powerful enough quantum computer.' },
        { term: 'Harvest Now, Decrypt Later', definition: 'Attackers collecting encrypted data now to decrypt when quantum computers mature.' },
      ],
    },
    {
      heading: 'Zero Trust Architecture',
      body: 'Zero Trust is a security model that assumes no user, device, or network — internal or external — should be trusted by default. The traditional "castle and moat" approach trusted everything inside the network perimeter, but this fails when attackers breach the perimeter (which they inevitably do). Zero Trust replaces this with "never trust, always verify" — every access request is authenticated, authorized, and continuously validated, regardless of where it originates. Core principles: verify explicitly (use multiple signals for authentication), enforce least privilege (minimize access), and assume breach (design as if attackers are already inside). Implementation involves micro-segmentation (dividing the network into small zones), continuous monitoring, and identity-based access policies. Zero Trust is now a federal mandate for US government agencies and is becoming the standard for modern enterprise security.',
      keyTerms: [
        { term: 'Zero Trust', definition: 'A security model assuming no entity is trusted by default — always verify.' },
        { term: 'Micro-segmentation', definition: 'Dividing networks into small, isolated zones to limit lateral movement.' },
        { term: 'Assume Breach', definition: 'Designing security as if attackers are already inside the network.' },
      ],
    },
    {
      heading: 'Career Paths & Interview Readiness',
      body: 'Cybersecurity offers diverse career paths: Security Analyst (monitoring and responding to threats in a SOC), Penetration Tester (ethical hacking — finding vulnerabilities before attackers do), Security Engineer (building and maintaining security infrastructure), Incident Responder (leading breach response), Security Consultant (advising organizations), and CISO (Chief Information Security Officer — executive leadership). Entry-level roles often start as SOC Analysts or Junior Security Engineers. Key certifications by career stage: ISC2 CC and CompTIA Security+ (entry), SSCP and CySA+ (intermediate), CISSP and CCSP (senior). Interview preparation: understand the CIA Triad, common attacks, incident response, access control models, and be ready to discuss real-world scenarios. Practice explaining technical concepts clearly — communication is as important as technical knowledge. Build a portfolio: GitHub projects, Forage simulations, and a LinkedIn presence demonstrating continuous learning. The field has zero percent unemployment for qualified professionals.',
      keyTerms: [
        { term: 'SOC Analyst', definition: 'Entry-level role monitoring and responding to security alerts.' },
        { term: 'Penetration Tester', definition: 'Ethical hacker who finds vulnerabilities before attackers do.' },
        { term: 'CISO', definition: 'Chief Information Security Officer — executive leading security strategy.' },
      ],
    },
  ],
  checkIns: [
    {
      id: '8c1',
      question: 'How does AI change the threat landscape for BOTH attackers and defenders?',
      options: [
        'AI only helps defenders',
        'AI only helps attackers',
        'Attackers use AI for convincing phishing and polymorphic malware; defenders use AI for automated threat hunting and anomaly detection',
        'AI has no impact on cybersecurity',
      ],
      correctIndex: 2,
      explanation: 'AI is a dual-use technology. Attackers use it for deepfake phishing, automated vulnerability discovery, and polymorphic malware. Defenders use it for automated threat hunting, anomaly detection, and reducing alert fatigue. It is an AI arms race.',
    },
    {
      id: '8c2',
      question: 'Why is "harvest now, decrypt later" a concern even though large-scale quantum computers do not yet exist?',
      options: [
        'Quantum computers already exist in secret',
        'Attackers are collecting encrypted data now to decrypt later when quantum computers mature, making current encryption obsolete',
        'It is not a real concern',
        'Current encryption is quantum-resistant',
      ],
      correctIndex: 1,
      explanation: 'Even without quantum computers today, attackers are harvesting encrypted data to decrypt in the future when quantum computers can break current encryption. This is why Post-Quantum Cryptography (PQC) migration must start now.',
    },
    {
      id: '8c3',
      question: 'What is the core principle of Zero Trust Architecture?',
      options: [
        'Trust everything inside the network',
        'Never trust, always verify — no entity is trusted by default, inside or outside',
        'Trust no one, so do not grant any access',
        'Trust only cloud services',
      ],
      correctIndex: 1,
      explanation: 'Zero Trust assumes "never trust, always verify" — every access request is authenticated, authorized, and continuously validated, regardless of origin. It replaces the traditional "castle and moat" model that trusted everything inside the perimeter.',
    },
  ],
  exam: [
    {
      id: '8e1',
      concept: 'AI in Cybersecurity',
      variants: [
        {
          question: 'An organization deploys an ML-based system that learns normal user behavior and flags when an employee suddenly accesses unusual files at 3 AM. What is this an example of?',
          options: ['Signature-based detection', 'AI-driven anomaly detection / threat hunting', 'Port scanning', 'DNS spoofing'],
          correctIndex: 1,
        },
        {
          question: 'Attackers use AI to clone a CEO\'s voice and call the CFO, authorizing a wire transfer. What AI-powered attack is this?',
          options: ['Polymorphic malware', 'Deepfake-based social engineering (vishing)', 'Quantum attack', 'Zero Trust bypass'],
          correctIndex: 1,
        },
        {
          question: 'Malware automatically rewrites its own code each time it infects a new machine, making signature-based detection ineffective. What is this called?',
          options: ['Ransomware', 'Polymorphic malware', 'Trojan', 'Rootkit'],
          correctIndex: 1,
        },
      ],
      feedback: 'AI is dual-use. Defenders use AI for anomaly detection (learning baselines, flagging deviations) and automated threat hunting. Attackers use AI for deepfakes (cloning voice/video for social engineering) and polymorphic malware (auto-mutating code to evade signatures). The AI arms race means defenders must leverage AI to keep pace. Re-read the AI-Driven Threat Hunting section.',
    },
    {
      id: '8e2',
      concept: 'Quantum Cryptography & PQC',
      variants: [
        {
          question: 'Why are current RSA and ECC encryption algorithms threatened by quantum computing?',
          options: [
            'Quantum computers are faster at encryption',
            'Shor\'s algorithm on a quantum computer can break the math RSA and ECC rely on',
            'Quantum computers can brute-force passwords instantly',
            'They are not threatened',
          ],
          correctIndex: 1,
        },
        {
          question: 'Attackers are collecting encrypted diplomatic communications today, storing them to decrypt in the future when quantum computers mature. What is this strategy called?',
          options: ['Quantum key distribution', 'Harvest now, decrypt later', 'Post-quantum migration', 'Zero Trust'],
          correctIndex: 1,
        },
        {
          question: 'What is Post-Quantum Cryptography (PQC)?',
          options: [
            'Encryption using quantum computers',
            'New cryptographic algorithms designed to resist attacks from quantum computers',
            'A type of firewall',
            'Encryption that only works in space',
          ],
          correctIndex: 1,
        },
      ],
      feedback: 'Quantum computers running Shor\'s algorithm can break RSA and ECC — the math behind current public-key crypto. "Harvest now, decrypt later" means attackers store encrypted data to decrypt when quantum computers mature. Post-Quantum Cryptography (PQC) = new algorithms resistant to quantum attacks (NIST is standardizing these). Organizations must inventory crypto assets and plan PQC migration now. Re-read the Quantum Cryptography section.',
    },
    {
      id: '8e3',
      concept: 'Zero Trust Architecture',
      variants: [
        {
          question: 'A company allows employees to access internal apps from anywhere, but every request requires MFA, device posture checks, and continuous session validation. What security model is this?',
          options: ['Castle and moat', 'Zero Trust Architecture', 'Signature-based security', 'Physical security only'],
          correctIndex: 1,
        },
        {
          question: 'What does "assume breach" mean in the Zero Trust model?',
          options: [
            'Assume no attacks will happen',
            'Design security as if attackers are already inside the network',
            'Assume all breaches are reported',
            'Assume firewalls are perfect',
          ],
          correctIndex: 1,
        },
        {
          question: 'An organization divides its network into small, isolated zones so that if one zone is compromised, the attacker cannot move laterally to others. What is this technique?',
          options: ['Phishing training', 'Micro-segmentation (a Zero Trust technique)', 'Port scanning', 'Data classification'],
          correctIndex: 1,
        },
      ],
      feedback: 'Zero Trust = "never trust, always verify" — every request is authenticated, authorized, and continuously validated, regardless of origin. "Assume breach" means designing as if attackers are already inside. Micro-segmentation divides the network into isolated zones to prevent lateral movement. Zero Trust replaces the "castle and moat" model that trusted everything inside the perimeter. Re-read the Zero Trust Architecture section.',
    },
    {
      id: '8e4',
      concept: 'Career Paths & Certification Roadmap',
      variants: [
        {
          question: 'A new professional wants to enter cybersecurity. Which certification is the BEST entry-level starting point?',
          options: ['CISSP', 'ISC2 CC (Certified in Cybersecurity)', 'CCSP', 'AWS Security Specialty'],
          correctIndex: 1,
        },
        {
          question: 'Which role involves proactively simulating attacks to find vulnerabilities before real attackers do?',
          options: ['SOC Analyst', 'Penetration Tester', 'CISO', 'Compliance Officer'],
          correctIndex: 1,
        },
        {
          question: 'A professional has 5+ years of experience and wants to move into senior security leadership. Which certification is most appropriate?',
          options: ['ISC2 CC', 'CompTIA Security+', 'CISSP (Certified Information Systems Security Professional)', 'No certification needed'],
          correctIndex: 2,
        },
      ],
      feedback: 'Career path: entry-level = ISC2 CC and CompTIA Security+ (foundational). Intermediate = SSCP, CySA+. Senior = CISSP, CCSP. SOC Analyst = monitoring/responding to alerts. Penetration Tester = ethical hacking, finding vulnerabilities. CISO = executive security leadership. Build a portfolio (GitHub, Forage, LinkedIn) and practice explaining technical concepts clearly. The field has near-zero unemployment for qualified professionals. Re-read the Career Paths section.',
    },
  ],
  mastery: {
    github: {
      title: 'Portfolio Lab: Cybersecurity Career Tracker',
      description: 'Build a Python tool that tracks certification progress, maps skills to job roles, and generates a personalized career development plan.',
      code: `# career_tracker.py
# Cyber Academy — Unit 8 Portfolio Lab
# Track certifications, map skills to roles, generate development plans

CERTIFICATIONS = {
    "ISC2 CC": {"level": "Entry", "domains": ["Security Principles", "Threats", "Tools", "Response"], "cost": "$50"},
    "CompTIA Security+": {"level": "Entry", "domains": ["Security Concepts", "Threats", "Architecture", "Operations"], "cost": "$392"},
    "SSCP": {"level": "Intermediate", "domains": ["Access Controls", "Crypto", "Networks", "Incidents"], "cost": "$250"},
    "CISSP": {"level": "Senior", "domains": ["8 CBK Domains"], "cost": "$749", "experience": "5 years required"},
    "CCSP": {"level": "Senior", "domains": ["Cloud Security", "Cloud Architecture"], "cost": "$599"},
}

JOB_ROLES = {
    "SOC Analyst (Entry)": ["ISC2 CC", "CompTIA Security+"],
    "Security Engineer (Mid)": ["CompTIA Security+", "SSCP"],
    "Penetration Tester": ["CompTIA Security+", "OSCP"],
    "Security Architect (Senior)": ["CISSP", "CCSP"],
    "CISO (Executive)": ["CISSP", "CISM"],
}

def generate_plan(current_certs, target_role):
    print(f"\\n{'='*60}")
    print(f"CAREER DEVELOPMENT PLAN")
    print(f"Target Role: {target_role}")
    print(f"{'='*60}")

    required = JOB_ROLES.get(target_role, [])
    print(f"\\nCurrent certifications: {', '.join(current_certs) or 'None'}")
    print(f"Required for role: {', '.join(required) or 'See role details'}")

    print(f"\\n[RECOMMENDED PATH]")
    for cert in required:
        info = CERTIFICATIONS.get(cert, {})
        status = "DONE" if cert in current_certs else "TODO"
        print(f"  [{status}] {cert} — {info.get('level', '?')} — {info.get('cost', '?')}")
        if "experience" in info:
            print(f"         Note: {info['experience']}")

    print(f"\\n[NEXT STEPS]")
    for cert in required:
        if cert not in current_certs:
            print(f"  -> Study for {cert}")
            print(f"     Domains: {', '.join(CERTIFICATIONS.get(cert, {}).get('domains', []))}")
            break

if __name__ == "__main__":
    generate_plan(["ISC2 CC"], "Security Architect (Senior)")

# Run: python career_tracker.py`,
    },
    linkedin: {
      copy: "I have COMPLETED all 8 units of Cyber Academy! 🎓 From security principles (CIA Triad, AAA) through threat actors, malware, social engineering, security tools (firewalls, IDS/IPS, SIEM, Wireshark), safe digital behavior, access control & IAM, workplace governance & compliance, incident response lifecycle, and future trends (AI threat hunting, quantum cryptography, Zero Trust). I am now ready to pursue my ISC2 CC certification and begin my cybersecurity career. The journey doesn't stop here — it accelerates! 🚀",
      hashtags: ['#Cybersecurity', '#ISC2CC', '#LearningInPublic', '#CyberAcademy', '#InfoSec', '#CareerTransition', '#CertifiedInCybersecurity'],
    },
    forage: {
      title: 'Virtual Job Simulation',
      description: 'Complete advanced virtual job simulations across multiple cybersecurity domains to build a comprehensive portfolio for interviews.',
      program: 'Multiple Forage Programs (Mastercard, AIG, ANZ, Commonwealth Bank)',
      url: 'https://www.theforage.com/',
    },
  },
}

// ============================================================================
// EXPORT ALL UNITS
// ============================================================================
export const UNITS: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8]

// ============================================================================
// 5-PHASE CAREER MATRIX
// ============================================================================
export interface CareerPhase {
  id: number
  name: string
  timeframe: string
  description: string
  certifications: { name: string; detail: string; status: 'active' | 'planned' | 'elite' }[]
  color: string
}

export const CAREER_PHASES: CareerPhase[] = [
  {
    id: 1,
    name: 'FOUNDATION',
    timeframe: 'Now → Month 6',
    description: 'Build the core knowledge base with entry-level certifications that establish cybersecurity fundamentals.',
    certifications: [
      { name: 'ISC2 CC', detail: 'Certified in Cybersecurity — foundational knowledge across 5 domains', status: 'active' },
      { name: 'IQ Academy Cybersecurity', detail: 'Active learning trackers building practical skills', status: 'active' },
    ],
    color: 'cyan',
  },
  {
    id: 2,
    name: 'GET EMPLOYED',
    timeframe: 'Month 6 → Month 12',
    description: 'Earn the certification that opens doors to entry-level security roles.',
    certifications: [
      { name: 'CompTIA Security+', detail: 'The Core Door Opener — globally recognized, vendor-neutral security certification', status: 'planned' },
    ],
    color: 'green',
  },
  {
    id: 3,
    name: 'SPECIALISE',
    timeframe: 'Year 2',
    description: 'Expand into cloud security with foundational cloud certifications across major platforms.',
    certifications: [
      { name: 'Microsoft AZ-900', detail: 'Azure Fundamentals — cloud concepts and Azure services', status: 'planned' },
      { name: 'Microsoft SC-900', detail: 'Security, Compliance, and Identity Fundamentals', status: 'planned' },
      { name: 'AWS Certified Cloud Practitioner', detail: 'Foundational AWS cloud knowledge', status: 'planned' },
    ],
    color: 'yellow',
  },
  {
    id: 4,
    name: 'ADVANCE',
    timeframe: 'Year 2-3',
    description: 'Move into intermediate-level security certifications requiring practical experience.',
    certifications: [
      { name: 'SSCP', detail: 'Systems Security Certified Practitioner — requires 1 year experience', status: 'planned' },
      { name: 'AWS Certified Security – Specialty', detail: 'Advanced AWS security architecture and implementation', status: 'planned' },
    ],
    color: 'pink',
  },
  {
    id: 5,
    name: 'ELITE',
    timeframe: 'Year 5+',
    description: 'Reach the senior professional layer with the most prestigious certifications in cybersecurity.',
    certifications: [
      { name: 'CISSP', detail: 'Certified Information Systems Security Professional — the gold standard', status: 'elite' },
      { name: 'CCSP', detail: 'Certified Cloud Security Professional — senior cloud security', status: 'elite' },
    ],
    color: 'cyan',
  },
]
