// data.ts
export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'code' | 'true-false';
  options?: string[];
  codeSnippet?: string;
  language?: string;
}

export interface Section {
  id: string;
  title: string;
  color: string;
  questions: Question[];
}

export interface ExamInfo {
  title: string;
  targetAudience: string;
  totalQuestions: number;
}

export const examInfo: ExamInfo = {
  title: "Final Exam: Programming & Networking",
  targetAudience: "Students & Fresher",
  totalQuestions: 50
};

export const sections: Section[] = [
  {
    id: "fundamentals",
    title: "Fundamentals Of Programming",
    color: "blue",
    questions: [
      {
        id: "q1",
        text: "Which Of The Following Is An Example Of A Compiled Language?",
        type: "multiple-choice",
        options: ["Python", "Java", "C++", "JavaScript"]
      },
      {
        id: "q2",
        text: "Explain The Difference Between A Compiler And An Interpreter.",
        type: "text"
      },
      {
        id: "q3",
        text: "Which Of The Following Python Snippets Will Correctly Print Numbers From 1 To 5 (Inclusive)?",
        type: "code",
        options: [
          "for i in range(1, 6):\n    print(i)",
          "while i < 6:\n    print(i)\n    i += 1",
          "for i in range(0, 5):\n    print(i)",
          "for i in range(1, 5):\n    print(i)"
        ],
        language: "python"
      },
      {
        id: "q4",
        text: "What Will Be The Output Of The Following Code (In Python)?",
        type: "code",
        codeSnippet: "x = 5\ny = 3\nprint(x // y)",
        language: "python",
        options: ["2.5", "2", "3", "2.0"]
      },
      {
        id: "q5",
        text: "Name Three Data Types Commonly Used In Programming.",
        type: "text"
      }
    ]
  },
  {
    id: "network-security",
    title: "Network Security",
    color: "orange",
    questions: [
      {
        id: "ns1",
        text: "Which Of The Following Is An Example Of A Strong Password?",
        type: "multiple-choice",
        options: ["Password123", "John1990", "$Tr0ng_P@ss#45", "Qwerty"]
      },
      {
        id: "ns2",
        text: "What Is The Difference Between Symmetric And Asymmetric Encryption?",
        type: "text"
      },
      {
        id: "ns3",
        text: "Which Of The Following Best Explains The Concept Of Encapsulation In Object-Oriented Programming (OOP)?",
        type: "multiple-choice",
        options: [
          "Encapsulation Means Breaking A Program Into Multiple Functions So That Each Function Can Handle A Specific Task. This Approach Helps In Modular Programming And Allows For Code Reuse And A Hierarchical Structure In The Program.",
          "Encapsulation Refers To The Process Of Binding Data (Variables) And The Methods (Functions) That Operate On That Data Into A Single Unit, Typically A Class. It Also Restricts Direct Access To Some Of The Object's Components, Which Is Achieved Through Access Modifiers Like Private, Protected, And Public.",
          "Encapsulation In When Inheritance Allows A Class To Inherit Properties And Methods From A Single Function So That Function Can Handle A Specific Task. This Approach Helps In Modular Programming And Allows For Code Reuse And A Hierarchical Structure In The Program.",
          "Encapsulation Means Writing All Your Program Logic Inside A Single Function So That Function Can Handle A Specific Task. This Approach Helps In Modular Programming And Allows For Code Reuse And Unnecessary Complexity."
        ]
      },
      {
        id: "ns4",
        text: "Two-Factor Authentication Adds An Extra Layer Of Security Beyond Just A Password.",
        type: "true-false",
        options: ["True", "False"]
      },
      {
        id: "ns5",
        text: "What Is The Role Of Intrusion Detection Systems (IDS) In Network Security?",
        type: "text"
      }
    ]
  }
];
