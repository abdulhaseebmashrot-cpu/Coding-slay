import { db } from './lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const initialLessons = [
  {
    title: "Introduction to JavaScript",
    language: "javascript",
    content: "# Welcome to JavaScript\n\nJavaScript is the language of the web. It allows you to add interactivity to your websites.\n\n## Variables\n\nIn JavaScript, you can store data in variables using `let` or `const`.\n\n```javascript\nlet name = 'CodeMaster';\nconsole.log('Hello, ' + name);\n```",
    codeExample: "let name = 'CodeMaster';\nconsole.log('Hello, ' + name);",
    difficulty: "beginner",
    order: 1,
    challenge: {
      description: "Change the variable 'name' to your own name and log it to the console.",
      solution: "console.log",
      testCases: []
    }
  },
  {
    title: "Python Basics: Print and Variables",
    language: "python",
    content: "# Python Fundamentals\n\nPython is a versatile and easy-to-read language.\n\n## Printing\n\nUse the `print()` function to output text.\n\n```python\nmessage = 'Hello Python'\nprint(message)\n```",
    codeExample: "message = 'Hello Python'\nprint(message)",
    difficulty: "beginner",
    order: 2,
    challenge: {
      description: "Create a variable named 'age' and set it to 25, then print it.",
      solution: "print(age)",
      testCases: []
    }
  },
  {
    title: "HTML Structure",
    language: "html",
    content: "# HTML Structure\n\nHTML (HyperText Markup Language) is the backbone of any website.\n\n## Elements\n\nElements are the building blocks of HTML. They are represented by tags.\n\n```html\n<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n```",
    codeExample: "<!-- Try adding a heading and a paragraph below -->\n<h1>My First Page</h1>\n<p>Welcome to CodeSlay.</p>",
    difficulty: "beginner",
    order: 3,
    challenge: {
      description: "Create an h1 tag with the text 'My First Page'.",
      solution: "<h1>",
      testCases: []
    }
  },
  {
    title: "C++: Hello World",
    language: "cpp",
    content: "# C++ Introduction\n\nC++ is a powerful, high-performance language.\n\n## Basic Structure\n\n```cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n    return 0;\n}\n```",
    codeExample: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n    return 0;\n}",
    difficulty: "beginner",
    order: 4,
    challenge: {
      description: "Modify the program to output 'Welcome to C++'.",
      solution: "Welcome to C++",
      testCases: []
    }
  },
  {
    title: "Java: Classes and Objects",
    language: "java",
    content: "# Java OOP\n\nJava is a class-based, object-oriented programming language.\n\n## Main Class\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello Java\");\n    }\n}\n```",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello Java\");\n    }\n}",
    difficulty: "beginner",
    order: 5,
    challenge: {
      description: "Change the output message to 'Java is fun'.",
      solution: "Java is fun",
      testCases: []
    }
  }
];

const initialChallenges = [
  {
    title: "Reverse a String",
    category: "Algorithms",
    description: "Write a function that reverses a string.",
    points: 100,
    difficulty: "beginner",
    language: "javascript",
    solution: "split('').reverse().join('')"
  },
  {
    title: "Find the Largest Number",
    category: "Logic",
    description: "Find the largest number in an array.",
    points: 150,
    difficulty: "beginner",
    language: "python",
    solution: "max("
  },
  {
    title: "Center a Div",
    category: "Web Development",
    description: "Use CSS Flexbox to center a div both horizontally and vertically.",
    points: 120,
    difficulty: "intermediate",
    language: "css",
    solution: "justify-content: center; align-items: center;"
  }
];

export const seedDatabase = async () => {
  try {
    const lessonsSnap = await getDocs(collection(db, 'lessons'));
    if (lessonsSnap.empty) {
      for (const lesson of initialLessons) {
        await addDoc(collection(db, 'lessons'), lesson);
      }
      console.log("Database seeded with initial lessons.");
    }

    const challengesSnap = await getDocs(collection(db, 'challenges'));
    if (challengesSnap.empty) {
      for (const challenge of initialChallenges) {
        await addDoc(collection(db, 'challenges'), challenge);
      }
      console.log("Database seeded with initial challenges.");
    }
  } catch (error) {
    console.log("Seeding skipped or failed due to permissions.");
  }
};
