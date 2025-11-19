/* 
An **Execution Context** in JavaScript is the complete environment in which a particular piece of code is evaluated and executed. Every time you run code—whether at the top level, inside a function, or in a module—you’re operating inside an execution context.

**Execution Context (Stack Frame)** is the snapshot that holds everything the JavaScript engine needs to execute a piece of code.

Execution Context
- কোনো fnএর Execution Context হলো একটা data package
- যার মধ্যে ওই fnএর code execute করার জন্যে দরকারি সব data থাকে like,
- variable environment (var + fn declarations)
- lexical environment (let/const/class + outer scope link)
- `this` binding (fnটা কিভাবে called হয়েছে সেই অনুযায়ী) etc.


An **Execution Context** is the JS engine’s way of packaging: Which code to run, What data (variables, scopes, `this`) it needs, How to find outer scopes, Where to return after completion

Understanding contexts is key to mastering hoisting, closures, `this`, and async control flow in JavaScript.

Why Execution Contexts Matter
- **Hoisting**: Function declarations & `var` get set up before any code runs.
- **Closures**: Inner functions carry their context’s lexical environment with them.
- *`this` behavior*: Changing how you call a function (via `.call()`, as a method, or as a constructor) changes the context’s `this`. 
- **Async/generators**: Contexts can pause and resume, preserving local state across awaits/yields. 

## Execution Context Fields (per ECMAScript spec)
From the ES2023 spec, an execution context has five key fields:

- Function → The function being executed (or null for global).
- Realm → The realm in which the code is running.
- LexicalEnvironment
- VariableEnvironment
- PrivateEnvironment (added for private class fields/methods).
- thisBinding

*/

// **************************************

/*
In most cases, the VariableEnvironment uses a DeclarativeEnvironmentRecord, not an ObjectEnvironmentRecord.

But in global and with contexts, the VariableEnvironment may use an ObjectEnvironmentRecord.

So both can be true depending on context, but the default and most common structure (especially in function scope) is:

VariableEnvironment {
  EnvironmentRecord: DeclarativeEnvironmentRecord,
  Outer: LexicalEnvironment | null
}

DeclarativeEnvironmentRecord → internal bindings like let, const, function, var in functions/modules.

ObjectEnvironmentRecord → binds identifiers to properties of real JS objects (e.g., globalThis, with(obj)).
*/

/*
1. Function Execution Context (most common)
When a function is invoked:

A new ExecutionContext is created.

Both LexicalEnvironment and VariableEnvironment are initialized using DeclarativeEnvironmentRecord.

function foo() {
  var a = 10;
  let b = 20;
}

In this case:
- a (declared with var) goes into the VariableEnvironment's DeclarativeEnvironmentRecord.
- b (declared with let) goes into the LexicalEnvironment's DeclarativeEnvironmentRecord.

So here:
VariableEnvironment.EnvironmentRecord === DeclarativeEnvironmentRecord

2. Global Execution Context
At the global scope, variable bindings (declared with var) are stored in object-based records — they’re actual properties of the global object (window, globalThis, etc.).

So here:
VariableEnvironment.EnvironmentRecord === ObjectEnvironmentRecord
This is why var a = 1; becomes window.a = 1; in browsers.
*/
