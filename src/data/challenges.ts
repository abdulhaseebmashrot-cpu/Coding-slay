export const challenges = [
  // JavaScript
  { id: 'js-1', title: 'JS: Hello World', description: 'Print "Hello World" to the console.', points: 10, difficulty: 'beginner', category: 'JavaScript', initialCode: 'console.log("Hello World");', solution: 'hello world' },
  { id: 'js-2', title: 'JS: Variables', description: 'Declare a variable named x with value 5.', points: 10, difficulty: 'beginner', category: 'JavaScript', initialCode: 'let x = 5; console.log(x);', solution: '5' },
  { id: 'js-3', title: 'JS: Loops', description: 'Loop from 0 to 4 and log each number.', points: 20, difficulty: 'intermediate', category: 'JavaScript', initialCode: 'for(let i=0; i<5; i++) console.log(i);', solution: '0\n1\n2\n3\n4' },
  { id: 'js-4', title: 'JS: Objects', description: 'Create an object with name "Alice".', points: 20, difficulty: 'intermediate', category: 'JavaScript', initialCode: 'const obj = {name: "Alice"}; console.log(obj.name);', solution: 'Alice' },
  { id: 'js-5', title: 'JS: Closures', description: 'Create a function that returns a function.', points: 30, difficulty: 'advanced', category: 'JavaScript', initialCode: 'function outer() { return () => "inner"; } console.log(outer()());', solution: 'inner' },
  // Python
  { id: 'py-1', title: 'Py: Hello World', description: 'Print "Hello World".', points: 10, difficulty: 'beginner', category: 'Python', initialCode: 'print("Hello World")', solution: 'Hello World' },
  { id: 'py-2', title: 'Py: Variables', description: 'Set x = 10 and print x.', points: 10, difficulty: 'beginner', category: 'Python', initialCode: 'x = 10\nprint(x)', solution: '10' },
  { id: 'py-3', title: 'Py: Lists', description: 'Create a list [1, 2, 3] and print it.', points: 20, difficulty: 'intermediate', category: 'Python', initialCode: 'l = [1, 2, 3]\nprint(l)', solution: '[1, 2, 3]' },
  { id: 'py-4', title: 'Py: Functions', description: 'Define a function that returns 5.', points: 20, difficulty: 'intermediate', category: 'Python', initialCode: 'def f(): return 5\nprint(f())', solution: '5' },
  { id: 'py-5', title: 'Py: Decorators', description: 'Create a simple decorator.', points: 30, difficulty: 'advanced', category: 'Python', initialCode: 'def d(f): return f\n@d\ndef g(): return "ok"\nprint(g())', solution: 'ok' },
  // CSS
  { id: 'css-1', title: 'CSS: Colors', description: 'Set body background to red.', points: 10, difficulty: 'beginner', category: 'CSS', initialCode: 'body { background: red; }', solution: 'red' },
  { id: 'css-2', title: 'CSS: Fonts', description: 'Set font-size to 20px.', points: 10, difficulty: 'beginner', category: 'CSS', initialCode: 'p { font-size: 20px; }', solution: '20px' },
  { id: 'css-3', title: 'CSS: Flexbox', description: 'Center items with flex.', points: 20, difficulty: 'intermediate', category: 'CSS', initialCode: '.container { display: flex; justify-content: center; }', solution: 'center' },
  { id: 'css-4', title: 'CSS: Grid', description: 'Create a 2-column grid.', points: 20, difficulty: 'intermediate', category: 'CSS', initialCode: '.grid { display: grid; grid-template-columns: 1fr 1fr; }', solution: '2' },
  { id: 'css-5', title: 'CSS: Animations', description: 'Create a fade-in animation.', points: 30, difficulty: 'advanced', category: 'CSS', initialCode: '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }', solution: '1' },
  // HTML
  { id: 'html-1', title: 'HTML: Tags', description: 'Create a h1 tag.', points: 10, difficulty: 'beginner', category: 'HTML', initialCode: '<h1>Title</h1>', solution: 'Title' },
  { id: 'html-2', title: 'HTML: Links', description: 'Create a link to google.com.', points: 10, difficulty: 'beginner', category: 'HTML', initialCode: '<a href="https://google.com">Link</a>', solution: 'google.com' },
  { id: 'html-3', title: 'HTML: Forms', description: 'Create an input field.', points: 20, difficulty: 'intermediate', category: 'HTML', initialCode: '<input type="text" />', solution: 'input' },
  { id: 'html-4', title: 'HTML: Tables', description: 'Create a table with 1 row.', points: 20, difficulty: 'intermediate', category: 'HTML', initialCode: '<table><tr><td>Data</td></tr></table>', solution: 'Data' },
  { id: 'html-5', title: 'HTML: Semantic', description: 'Use a section tag.', points: 30, difficulty: 'advanced', category: 'HTML', initialCode: '<section>Content</section>', solution: 'Content' },
  // C++
  { id: 'cpp-1', title: 'CPP: Hello World', description: 'Print "Hello World".', points: 10, difficulty: 'beginner', category: 'C++', initialCode: '#include <iostream>\nint main() { std::cout << "Hello World"; return 0; }', solution: 'Hello World' },
  { id: 'cpp-2', title: 'CPP: Variables', description: 'Set int x = 5 and print x.', points: 10, difficulty: 'beginner', category: 'C++', initialCode: '#include <iostream>\nint main() { int x = 5; std::cout << x; return 0; }', solution: '5' },
  { id: 'cpp-3', title: 'CPP: Loops', description: 'Loop 3 times.', points: 20, difficulty: 'intermediate', category: 'C++', initialCode: '#include <iostream>\nint main() { for(int i=0; i<3; i++) std::cout << i; return 0; }', solution: '012' },
  { id: 'cpp-4', title: 'CPP: Arrays', description: 'Create array of size 2.', points: 20, difficulty: 'intermediate', category: 'C++', initialCode: '#include <iostream>\nint main() { int arr[2] = {1, 2}; std::cout << arr[0]; return 0; }', solution: '1' },
  { id: 'cpp-5', title: 'CPP: Pointers', description: 'Use a pointer.', points: 30, difficulty: 'advanced', category: 'C++', initialCode: '#include <iostream>\nint main() { int x = 10; int* p = &x; std::cout << *p; return 0; }', solution: '10' },
  // Java
  { id: 'java-1', title: 'Java: Hello World', description: 'Print "Hello World".', points: 10, difficulty: 'beginner', category: 'Java', initialCode: 'public class Main { public static void main(String[] args) { System.out.print("Hello World"); } }', solution: 'Hello World' },
  { id: 'java-2', title: 'Java: Variables', description: 'Set int x = 5 and print x.', points: 10, difficulty: 'beginner', category: 'Java', initialCode: 'public class Main { public static void main(String[] args) { int x = 5; System.out.print(x); } }', solution: '5' },
  { id: 'java-3', title: 'Java: Loops', description: 'Loop 3 times.', points: 20, difficulty: 'intermediate', category: 'Java', initialCode: 'public class Main { public static void main(String[] args) { for(int i=0; i<3; i++) System.out.print(i); } }', solution: '012' },
  { id: 'java-4', title: 'Java: Classes', description: 'Create a class.', points: 20, difficulty: 'intermediate', category: 'Java', initialCode: 'class A { int x = 1; } public class Main { public static void main(String[] args) { A a = new A(); System.out.print(a.x); } }', solution: '1' },
  { id: 'java-5', title: 'Java: Inheritance', description: 'Inherit a class.', points: 30, difficulty: 'advanced', category: 'Java', initialCode: 'class A { int x = 1; } class B extends A {} public class Main { public static void main(String[] args) { B b = new B(); System.out.print(b.x); } }', solution: '1' },
];
