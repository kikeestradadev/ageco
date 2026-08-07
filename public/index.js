(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/prismjs/prism.js
  var require_prism = __commonJS({
    "node_modules/prismjs/prism.js"(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      /**
       * Prism: Lightweight, robust, elegant syntax highlighting
       *
       * @license MIT <https://opensource.org/licenses/MIT>
       * @author Lea Verou <https://lea.verou.me>
       * @namespace
       * @public
       */
      var Prism2 = (function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _ = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self2.Prism && _self2.Prism.manual,
          /**
           * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
           * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
           * own worker, you don't want it to do this.
           *
           * By setting this value to `true`, Prism will not add its own listeners to the worker.
           *
           * You obviously have to change this value before Prism executes. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.disableWorkerMessageHandler = true;
           * // Load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone2;
              var id;
              switch (_.util.type(o)) {
                case "Object":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone2 = /** @type {Record<string, any>} */
                  {};
                  visited[id] = clone2;
                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone2[key] = deepClone(o[key], visited);
                    }
                  }
                  return (
                    /** @type {any} */
                    clone2
                  );
                case "Array":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone2 = [];
                  visited[id] = clone2;
                  /** @type {Array} */
                  /** @type {any} */
                  o.forEach(function(v, i) {
                    clone2[i] = deepClone(v, visited);
                  });
                  return (
                    /** @type {any} */
                    clone2
                  );
                default:
                  return o;
              }
            },
            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function(element) {
              while (element) {
                var m = lang.exec(element.className);
                if (m) {
                  return m[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if (document.currentScript && document.currentScript.tagName === "SCRIPT" && 1 < 2) {
                return (
                  /** @type {any} */
                  document.currentScript
                );
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }
                return null;
              }
            },
            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function(id, redef) {
              var lang2 = _.util.clone(_.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function(inside, before, insert, root) {
              root = root || /** @type {any} */
              _.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _.languages.DFS(_.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _.util.objId;
              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);
                  var property = o[i];
                  var propertyType = _.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },
          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run("before-all-elements-highlight", env);
            for (var i = 0, element; element = env.elements[i++]; ) {
              _.highlightElement(element, async === true, env.callback);
            }
          },
          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function(element, async, callback) {
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            _.util.setLanguage(element, language);
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _.util.setLanguage(parent, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _.hooks.run("after-highlight", env);
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _.hooks.run("before-sanity-check", env);
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
          },
          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run("after-tokenize", env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
          },
          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},
            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function(name, callback) {
              var hooks = _.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function(name, env) {
              var callbacks = _.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i = 0, callback; callback = callbacks[i++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }
          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function(e) {
              s += stringify(e, language);
            });
            return s;
          }
          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language
          };
          var aliases = o.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;
                  p += currentNode.value.length;
                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }
                  p -= currentNode.value.length;
                  pos = p;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _;
          }
          if (!_.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _;
        }
        var script = _.util.currentScript();
        if (script) {
          _.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }
        if (!_.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _;
      })(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism2;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism2;
      }
      Prism2.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
              // see below
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
      Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
      Prism2.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism2.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism2.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism2.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
        /**
         * Adds an pattern to highlight languages embedded in HTML attributes.
         *
         * An example of an inlined language is CSS with `style` attributes.
         *
         * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addAttribute('style', 'css');
         */
        value: function(attrName, lang) {
          Prism2.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism2.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism2.languages.html = Prism2.languages.markup;
      Prism2.languages.mathml = Prism2.languages.markup;
      Prism2.languages.svg = Prism2.languages.markup;
      Prism2.languages.xml = Prism2.languages.extend("markup", {});
      Prism2.languages.ssml = Prism2.languages.xml;
      Prism2.languages.atom = Prism2.languages.xml;
      Prism2.languages.rss = Prism2.languages.xml;
      (function(Prism3) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism3.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
              // See rest below
            }
          },
          "url": {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
        var markup = Prism3.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism2);
      Prism2.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism2.languages.javascript = Prism2.languages.extend("clike", {
        "class-name": [
          Prism2.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + // constant
            (/NaN|Infinity/.source + "|" + // binary integer
            /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
            /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
            /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
            /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
            /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism2.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            // lookbehind
            // eslint-disable-next-line regexp/no-dupe-characters-character-class
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
            // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
            // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
            // with the only syntax, so we have to define 2 different regex patterns.
            /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
            /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
            /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism2.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism2.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism2.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism2.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism2.languages.markup) {
        Prism2.languages.markup.tag.addInlined("script", "javascript");
        Prism2.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism2.languages.js = Prism2.languages.javascript;
      (function() {
        if (typeof Prism2 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, void 0];
            }
            return [start, Number(end)];
          }
          return void 0;
        }
        Prism2.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism2.hooks.add("before-sanity-check", function(env) {
          var pre = (
            /** @type {HTMLPreElement} */
            env.element
          );
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism2.util.setLanguage(code, language);
            Prism2.util.setLanguage(pre, language);
            var autoloader = Prism2.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(
              src,
              function(text) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);
                  var start = range[0];
                  var end = range[1] == null ? lines.length : range[1];
                  if (start < 0) {
                    start += lines.length;
                  }
                  start = Math.max(0, Math.min(start - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));
                  text = lines.slice(start, end).join("\n");
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start + 1));
                  }
                }
                code.textContent = text;
                Prism2.highlightElement(code);
              },
              function(error) {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error;
              }
            );
          }
        });
        Prism2.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i = 0, element; element = elements[i++]; ) {
              Prism2.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism2.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    }
  });

  // src/js/modules/internalModule.js
  var internalModule = () => {
    console.log("Hola internal Module");
  };
  var internalModule_default = internalModule;

  // src/js/modules/styleGuideContainer.js
  var styleGuideContainer = () => {
    document.querySelectorAll(".style-guide-container").forEach((root) => {
      if (root.dataset.styleGuideContainerReady === "true") return;
      const links = [...root.querySelectorAll(".style-guide-container__nav-link")];
      const fab = root.querySelector(".style-guide-container__fab");
      const panel = root.querySelector(".style-guide-container__panel");
      if (!links.length) return;
      const sections = links.map((link) => {
        var _a;
        const id = (_a = link.getAttribute("href")) == null ? void 0 : _a.slice(1);
        const section = id ? document.getElementById(id) : null;
        return section ? { link, section } : null;
      }).filter(Boolean);
      const setActive = (activeHref) => {
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === activeHref);
        });
      };
      const closeNav = () => {
        root.classList.remove("is-nav-open");
        if (panel) panel.hidden = true;
        if (fab) {
          fab.setAttribute("aria-expanded", "false");
          fab.setAttribute("aria-label", "Abrir navegacion del style guide");
        }
      };
      const openNav = () => {
        root.classList.add("is-nav-open");
        if (panel) panel.hidden = false;
        if (fab) {
          fab.setAttribute("aria-expanded", "true");
          fab.setAttribute("aria-label", "Cerrar navegacion del style guide");
        }
      };
      const toggleNav = () => {
        if (root.classList.contains("is-nav-open")) closeNav();
        else openNav();
      };
      if (fab) {
        fab.addEventListener("click", toggleNav);
      }
      links.forEach((link) => {
        link.addEventListener("click", () => {
          setActive(link.getAttribute("href"));
          closeNav();
        });
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNav();
      });
      if (sections.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            const match = sections.find(({ section }) => section === visible.target);
            if (match) setActive(match.link.getAttribute("href"));
          },
          {
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0.1, 0.25, 0.5]
          }
        );
        const uniqueSections = [
          ...new Map(sections.map(({ section }) => [section.id, section])).values()
        ];
        uniqueSections.forEach((section) => observer.observe(section));
      }
      const hash = window.location.hash;
      const initialHref = links.some((link) => link.getAttribute("href") === hash) ? hash : links[0].getAttribute("href");
      setActive(initialHref);
      root.dataset.styleGuideContainerReady = "true";
    });
  };
  var styleGuideContainer_default = styleGuideContainer;

  // src/js/modules/siteHeader.js
  var siteHeader = () => {
    document.querySelectorAll(".site-header").forEach((root) => {
      if (root.dataset.siteHeaderReady === "true") return;
      const button = root.querySelector(".site-header__menu-btn");
      const mobileNav = root.querySelector(".site-header__mobile");
      if (!button || !mobileNav) return;
      const closeMenu = () => {
        mobileNav.classList.add("hidden");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Abrir men\xFA");
      };
      const openMenu = () => {
        mobileNav.classList.remove("hidden");
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", "Cerrar men\xFA");
      };
      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        if (isOpen) closeMenu();
        else openMenu();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
      });
      root.dataset.siteHeaderReady = "true";
    });
  };
  var siteHeader_default = siteHeader;

  // src/js/modules/fakeBucket.js
  var COLLECTIONS = {
    desempleados: {
      seedUrl: "./data/desempleados-data.json",
      apiUrl: "./api/bucket/desempleados"
    },
    emprendedores: {
      seedUrl: "./data/emprendedores-data.json",
      apiUrl: "./api/bucket/emprendedores"
    },
    voluntarios: {
      seedUrl: "./data/voluntarios-data.json",
      apiUrl: "./api/bucket/voluntarios"
    }
  };
  var STORAGE_PREFIX = "ageco:bucket:";
  var memory = {
    desempleados: null,
    emprendedores: null,
    voluntarios: null
  };
  var apiMode = null;
  var clone = (value) => JSON.parse(JSON.stringify(value));
  var clearLocalBucket = (name) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
      localStorage.removeItem("ageco:pendingFilter");
    } catch (e) {
    }
  };
  var setPendingFilter = (entity, record) => {
    try {
      localStorage.setItem(
        "ageco:pendingFilter",
        JSON.stringify({
          entity,
          id: record.id,
          nombre: record.nombre,
          at: Date.now()
        })
      );
      sessionStorage.setItem(
        "ageco:lastAdded",
        JSON.stringify({
          entity,
          id: record.id,
          nombre: record.nombre,
          at: Date.now()
        })
      );
    } catch (e) {
    }
  };
  var detectApi = async () => {
    if (apiMode !== null) return apiMode;
    try {
      const response = await fetch("./api/health", { cache: "no-store" });
      if (!response.ok) {
        apiMode = false;
        return false;
      }
      const data = await response.json();
      apiMode = Boolean(data == null ? void 0 : data.bucketApi);
      return apiMode;
    } catch (e) {
      apiMode = false;
      return false;
    }
  };
  var fetchJsonFile = async (name) => {
    const config = COLLECTIONS[name];
    const response = await fetch(config.seedUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${config.seedUrl}`);
    }
    const data = await response.json();
    return {
      title: data.title || name,
      lead: data.lead || "",
      items: Array.isArray(data.items) ? clone(data.items) : [],
      source: "json-file",
      mode: "file-readonly"
    };
  };
  var fetchFromApi = async (name) => {
    const config = COLLECTIONS[name];
    const response = await fetch(config.apiUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`API bucket no disponible (${response.status})`);
    }
    const data = await response.json();
    return {
      title: data.title || name,
      lead: data.lead || "",
      items: Array.isArray(data.items) ? clone(data.items) : [],
      source: "api-file",
      mode: "file"
    };
  };
  var ensureCollection = async (name) => {
    const config = COLLECTIONS[name];
    if (!config) throw new Error(`Colecci\xF3n desconocida: ${name}`);
    const hasApi = await detectApi();
    if (hasApi) {
      clearLocalBucket(name);
      const fresh = await fetchFromApi(name);
      memory[name] = fresh;
      return memory[name];
    }
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed == null ? void 0 : parsed.items)) {
          memory[name] = parsed;
          return memory[name];
        }
      }
    } catch (e) {
    }
    const fromFile = await fetchJsonFile(name);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(fromFile));
    } catch (e) {
    }
    memory[name] = fromFile;
    return memory[name];
  };
  var getItems = async (name) => {
    const collection = await ensureCollection(name);
    return clone(collection.items);
  };
  var getItemById = async (name, id) => {
    const items = await getItems(name);
    return items.find((item) => Number(item.id) === Number(id)) || null;
  };
  var getMode = async () => await detectApi() ? "file" : "localStorage";
  var addItem = async (name, item) => {
    const config = COLLECTIONS[name];
    if (!config) throw new Error(`Colecci\xF3n desconocida: ${name}`);
    const hasApi = await detectApi();
    if (hasApi) {
      const response = await fetch(config.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
        cache: "no-store"
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !(payload == null ? void 0 : payload.item)) {
        throw new Error((payload == null ? void 0 : payload.error) || "No se pudo guardar en el JSON del servidor local.");
      }
      memory[name] = null;
      setPendingFilter(name, payload.item);
      return clone(payload.item);
    }
    const collection = await ensureCollection(name);
    const maxId = collection.items.reduce((acc, row) => Math.max(acc, Number(row.id) || 0), 0);
    const record = {
      ...item,
      id: maxId + 1,
      creadoEn: (/* @__PURE__ */ new Date()).toISOString(),
      esNuevo: true
    };
    collection.items.unshift(record);
    collection.source = "localStorage";
    collection.mode = "localStorage";
    collection.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(collection));
    } catch (error) {
      throw new Error("No se pudo guardar en localStorage.");
    }
    memory[name] = collection;
    setPendingFilter(name, record);
    return clone(record);
  };
  var resetCollection = async (name) => {
    const config = COLLECTIONS[name];
    if (!config) throw new Error(`Colecci\xF3n desconocida: ${name}`);
    const hasApi = await detectApi();
    clearLocalBucket(name);
    memory[name] = null;
    if (hasApi) {
      const response = await fetch(`${config.apiUrl}/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
        cache: "no-store"
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error((payload == null ? void 0 : payload.error) || "No se pudo restaurar el JSON seed.");
      }
      memory[name] = {
        title: name,
        lead: "",
        items: clone(payload.items || []),
        source: "api-file",
        mode: "file"
      };
      return clone(memory[name].items);
    }
    const fromFile = await fetchJsonFile(name);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(fromFile));
    } catch (e) {
    }
    memory[name] = fromFile;
    return clone(fromFile.items);
  };
  var resetAll = async () => {
    await Promise.all(Object.keys(COLLECTIONS).map((name) => resetCollection(name)));
  };
  var fakeBucket = {
    collections: Object.keys(COLLECTIONS),
    ensureCollection,
    getItems,
    getItemById,
    getMode,
    addItem,
    resetCollection,
    resetAll
  };
  var fakeBucket_default = fakeBucket;

  // src/js/modules/perfilDetalle.js
  var fillList = (root, key, value) => {
    const list = root.querySelector(`[data-list="${key}"]`);
    if (!list || !Array.isArray(value)) return;
    list.innerHTML = "";
    value.forEach((entry) => {
      const li = document.createElement("li");
      if (entry && typeof entry === "object") {
        li.className = "rounded-md border border-[var(--border-soft)] bg-[var(--ageco-gray)] p-3 text-sm";
        li.innerHTML = `
				<p class="m-0 font-semibold">${entry.persona || ""}</p>
				<p class="m-0 text-[var(--ageco-gray-dark)]">${entry.tema || ""}</p>
				<time class="text-xs text-[var(--ageco-gray-dark)]">${entry.fecha || ""}</time>
			`;
      } else {
        li.textContent = String(entry);
      }
      list.appendChild(li);
    });
  };
  var applyItem = (pageRoot, item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        fillList(pageRoot, key, value);
        return;
      }
      pageRoot.querySelectorAll(`[data-field="${key}"]`).forEach((el) => {
        el.textContent = String(value);
      });
    });
    const progressBar = pageRoot.querySelector('[data-field="progresoBar"]');
    if (progressBar && item.progreso != null) {
      progressBar.style.width = `${item.progreso}%`;
    }
    const title = pageRoot.querySelector("h1");
    if (title && item.nombre) {
      title.textContent = item.nombre;
    }
  };
  var perfilDetalle = async () => {
    const roots = [...document.querySelectorAll(".perfil-detalle")];
    if (!roots.length) return;
    await Promise.all(
      roots.map(async (root) => {
        if (root.dataset.perfilDetalleReady === "true") return;
        const entity = root.dataset.perfilTipo;
        const params = new URLSearchParams(window.location.search);
        const id = Number(params.get("id"));
        const pageRoot = root.closest("main") || document;
        let item = null;
        if (entity && fakeBucket_default.collections.includes(entity)) {
          try {
            item = await fakeBucket_default.getItemById(entity, id);
            if (!item) {
              const items = await fakeBucket_default.getItems(entity);
              item = items[0] || null;
            }
          } catch (error) {
            console.error(error);
          }
        }
        if (!item) {
          const dataNode = root.querySelector("#perfil-data");
          if (!dataNode) return;
          try {
            const items = JSON.parse(dataNode.textContent || "[]");
            item = items.find((entry) => Number(entry.id) === id) || items[0];
          } catch (e) {
            return;
          }
        }
        if (!item) return;
        applyItem(pageRoot, item);
        root.dataset.perfilDetalleReady = "true";
      })
    );
  };
  var perfilDetalle_default = perfilDetalle;

  // src/js/modules/dataTable.js
  var normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u200b-\u200d\ufeff\u00a0]/g, "").replace(/\s+/g, " ").trim();
  var cellText = (cell) => cell ? cell.textContent.replace(/\s+/g, " ").trim() : "";
  var compareValues = (a, b) => {
    const dateA = Date.parse(a);
    const dateB = Date.parse(b);
    const bothDates = !Number.isNaN(dateA) && !Number.isNaN(dateB) && /\d{4}-\d{2}-\d{2}/.test(a);
    if (bothDates) return dateA - dateB;
    const numA = Number(String(a).replace(/[^\d.-]/g, ""));
    const numB = Number(String(b).replace(/[^\d.-]/g, ""));
    const bothNums = String(a).trim() !== "" && String(b).trim() !== "" && !Number.isNaN(numA) && !Number.isNaN(numB) && /^-?\d+(\.\d+)?$/.test(String(a).trim()) && /^-?\d+(\.\d+)?$/.test(String(b).trim());
    if (bothNums) return numA - numB;
    return normalize(a).localeCompare(normalize(b), "es", { sensitivity: "base" });
  };
  var matchedRows = (tbody) => [...tbody.querySelectorAll("tr")].filter((row) => row.dataset.filteredOut !== "true");
  var rowSearchText = (row) => {
    const fromData = row.getAttribute("data-search") || "";
    return `${fromData} ${row.textContent || ""}`;
  };
  var exportCsv = (table, tbody, filename) => {
    const headerRow = table.querySelector("thead tr");
    const rows = [headerRow, ...matchedRows(tbody)].filter(Boolean);
    const csv = rows.map(
      (row) => [...row.children].map((cell) => {
        const text = cellText(cell).replace(/"/g, '""');
        return `"${text}"`;
      }).join(",")
    ).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  var shareWhatsApp = (tbody, table, title) => {
    const headers = [...table.querySelectorAll("thead th")].map((th) => cellText(th));
    const lines = matchedRows(tbody).map(
      (row) => [...row.children].map((cell, index) => `${headers[index] || `Col ${index + 1}`}: ${cellText(cell)}`).join(" \xB7 ")
    );
    const text = [`*${title}*`, ...lines].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  var updateSortIndicators = (root, sortCol, sortDir) => {
    root.querySelectorAll("[data-data-table-sort]").forEach((button) => {
      const col = Number(button.dataset.dataTableSort);
      const indicator = button.querySelector("[data-sort-indicator]");
      if (!indicator) return;
      if (col === sortCol) {
        indicator.textContent = sortDir === "asc" ? "\u25B2" : "\u25BC";
        button.setAttribute("aria-sort", sortDir === "asc" ? "ascending" : "descending");
      } else {
        indicator.textContent = "";
        button.setAttribute("aria-sort", "none");
      }
    });
  };
  var ensurePagination = (root) => {
    let pager = root.querySelector("[data-data-table-pagination]");
    if (pager) return pager;
    pager = document.createElement("div");
    pager.dataset.dataTablePagination = "true";
    pager.className = "data-table__pagination mt-4 flex flex-col gap-3 m:flex-row m:items-center m:justify-between";
    pager.innerHTML = `
		<label class="inline-flex items-center gap-2 text-sm text-[var(--ageco-gray-dark)]">
			<span>Filas por p\xE1gina</span>
			<select
				class="rounded-md border border-[var(--border-soft)] bg-white px-2 py-1.5 text-sm"
				data-data-table-page-size
			>
				<option value="5">5</option>
				<option value="10" selected>10</option>
			</select>
		</label>
		<div class="flex flex-wrap items-center gap-2">
			<p class="m-0 text-sm text-[var(--ageco-gray-dark)]" data-data-table-page-info>\u2014</p>
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-[var(--border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ageco-black)] disabled:cursor-not-allowed disabled:opacity-40"
				data-data-table-prev
			>Anterior</button>
			<div class="flex flex-wrap gap-1" data-data-table-pages></div>
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-[var(--border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ageco-black)] disabled:cursor-not-allowed disabled:opacity-40"
				data-data-table-next
			>Siguiente</button>
		</div>
	`;
    root.appendChild(pager);
    return pager;
  };
  var dataTable = () => {
    document.querySelectorAll(".data-table").forEach((root) => {
      if (root.dataset.dataTableReady === "true") return;
      const table = root.querySelector("table");
      const getTbody = () => table == null ? void 0 : table.querySelector("tbody");
      const searchInput = root.querySelector("[data-data-table-search]");
      const countEl = root.querySelector("[data-data-table-count]");
      const printBtn = root.querySelector("[data-data-table-print]");
      const excelBtn = root.querySelector("[data-data-table-excel]");
      const whatsappBtn = root.querySelector("[data-data-table-whatsapp]");
      const tbody = getTbody();
      if (!table || !tbody) return;
      if (root._dataTableAbort) root._dataTableAbort.abort();
      const abortController = new AbortController();
      root._dataTableAbort = abortController;
      const { signal } = abortController;
      const filename = root.dataset.filename || "listado-ageco";
      const title = root.dataset.title || "Listado AGECO";
      const pager = ensurePagination(root);
      const pageSizeSelect = pager.querySelector("[data-data-table-page-size]");
      const pageInfo = pager.querySelector("[data-data-table-page-info]");
      const pagesEl = pager.querySelector("[data-data-table-pages]");
      const prevBtn = pager.querySelector("[data-data-table-prev]");
      const nextBtn = pager.querySelector("[data-data-table-next]");
      let sortCol = null;
      let sortDir = "asc";
      let currentPage = 1;
      const maxPageSize = 10;
      let pageSize = Math.min(
        maxPageSize,
        Number(root.dataset.pageSize) || Number(pageSizeSelect == null ? void 0 : pageSizeSelect.value) || maxPageSize
      );
      if (pageSizeSelect) {
        pageSizeSelect.value = String(pageSize);
      }
      const render = () => {
        const body = getTbody();
        if (!body) return;
        const matched = matchedRows(body);
        const total = body.querySelectorAll("tr").length;
        const matchedCount = matched.length;
        const totalPages = Math.max(1, Math.ceil(matchedCount / pageSize) || 1);
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        body.querySelectorAll("tr").forEach((row) => {
          if (row.dataset.filteredOut === "true") {
            row.style.display = "none";
            return;
          }
          const index = matched.indexOf(row);
          row.style.display = index >= start && index < end ? "" : "none";
        });
        if (countEl) {
          countEl.textContent = matchedCount === total ? `${total} registros` : `${matchedCount} de ${total} registros`;
        }
        if (pageInfo) {
          if (matchedCount === 0) {
            pageInfo.textContent = "Sin resultados";
          } else {
            const from = start + 1;
            const to = Math.min(end, matchedCount);
            pageInfo.textContent = `Mostrando ${from}\u2013${to} de ${matchedCount}`;
          }
        }
        if (prevBtn) prevBtn.disabled = currentPage <= 1 || matchedCount === 0;
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages || matchedCount === 0;
        if (pagesEl) {
          pagesEl.innerHTML = "";
          for (let page = 1; page <= totalPages; page += 1) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = String(page);
            button.className = page === currentPage ? "inline-flex size-8 items-center justify-center rounded-md border border-[var(--ageco-red)] bg-[var(--ageco-red)] text-xs font-semibold text-white" : "inline-flex size-8 items-center justify-center rounded-md border border-[var(--border-soft)] bg-white text-xs font-semibold text-[var(--ageco-black)]";
            button.addEventListener("click", () => {
              currentPage = page;
              render();
            });
            pagesEl.appendChild(button);
          }
        }
      };
      const applyFilter = () => {
        const body = getTbody();
        if (!body) return;
        const query = normalize((searchInput == null ? void 0 : searchInput.value) || "");
        body.querySelectorAll("tr").forEach((row) => {
          const haystack = normalize(rowSearchText(row));
          const match = !query || haystack.includes(query);
          row.dataset.filteredOut = match ? "false" : "true";
        });
        currentPage = 1;
        render();
      };
      const applySort = (colIndex) => {
        const body = getTbody();
        if (!body) return;
        if (sortCol === colIndex) {
          sortDir = sortDir === "asc" ? "desc" : "asc";
        } else {
          sortCol = colIndex;
          sortDir = "asc";
        }
        const rows = [...body.querySelectorAll("tr")];
        rows.sort((rowA, rowB) => {
          const a = cellText(rowA.children[colIndex]);
          const b = cellText(rowB.children[colIndex]);
          const result = compareValues(a, b);
          return sortDir === "asc" ? result : -result;
        });
        rows.forEach((row) => body.appendChild(row));
        updateSortIndicators(root, sortCol, sortDir);
        render();
      };
      searchInput == null ? void 0 : searchInput.addEventListener("input", applyFilter, { signal });
      searchInput == null ? void 0 : searchInput.addEventListener("search", applyFilter, { signal });
      searchInput == null ? void 0 : searchInput.addEventListener("keyup", applyFilter, { signal });
      root.querySelectorAll("[data-data-table-sort]").forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            const colIndex = Number(button.dataset.dataTableSort);
            if (Number.isNaN(colIndex)) return;
            applySort(colIndex);
          },
          { signal }
        );
      });
      prevBtn == null ? void 0 : prevBtn.addEventListener(
        "click",
        () => {
          currentPage -= 1;
          render();
        },
        { signal }
      );
      nextBtn == null ? void 0 : nextBtn.addEventListener(
        "click",
        () => {
          currentPage += 1;
          render();
        },
        { signal }
      );
      pageSizeSelect == null ? void 0 : pageSizeSelect.addEventListener(
        "change",
        () => {
          pageSize = Math.min(maxPageSize, Number(pageSizeSelect.value) || maxPageSize);
          currentPage = 1;
          render();
        },
        { signal }
      );
      printBtn == null ? void 0 : printBtn.addEventListener(
        "click",
        () => {
          const body = getTbody();
          body == null ? void 0 : body.querySelectorAll("tr").forEach((row) => {
            row.style.display = row.dataset.filteredOut === "true" ? "none" : "";
          });
          root.classList.add("is-printing");
          window.print();
          window.setTimeout(() => {
            root.classList.remove("is-printing");
            render();
          }, 300);
        },
        { signal }
      );
      excelBtn == null ? void 0 : excelBtn.addEventListener(
        "click",
        () => exportCsv(table, getTbody(), filename),
        { signal }
      );
      whatsappBtn == null ? void 0 : whatsappBtn.addEventListener(
        "click",
        () => shareWhatsApp(getTbody(), table, title),
        { signal }
      );
      root._dataTableApplyFilter = applyFilter;
      root._dataTableRender = render;
      applyFilter();
      root.dataset.dataTableReady = "true";
    });
  };
  var dataTable_default = dataTable;

  // src/js/modules/entityForm.js
  var errorClass = "border-[var(--ageco-red)] ring-2 ring-[color-mix(in_srgb,var(--ageco-red)_25%,transparent)]";
  var emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  var phoneOk = (value) => /^[\d\s()+-]{7,20}$/.test(value);
  var clearErrors = (form) => {
    form.querySelectorAll("[data-field-error]").forEach((node) => node.remove());
    form.querySelectorAll("[name]").forEach((field) => {
      errorClass.split(" ").forEach((cls) => field.classList.remove(cls));
    });
    const alert = form.querySelector("[data-form-alert]");
    if (alert) alert.hidden = true;
  };
  var showFieldError = (field, message) => {
    errorClass.split(" ").forEach((cls) => field.classList.add(cls));
    const error = document.createElement("p");
    error.className = "m-0 text-xs font-semibold text-[var(--ageco-red)]";
    error.dataset.fieldError = "true";
    error.textContent = message;
    field.insertAdjacentElement("afterend", error);
  };
  var showAlert = (form, message, tone = "error") => {
    let alert = form.querySelector("[data-form-alert]");
    if (!alert) {
      alert = document.createElement("div");
      alert.dataset.formAlert = "true";
      form.prepend(alert);
    }
    alert.hidden = false;
    alert.textContent = message;
    alert.className = tone === "success" ? "rounded-md border-l-4 border-[var(--sigo-green)] bg-[color-mix(in_srgb,var(--sigo-green)_12%,white)] p-3 text-sm text-[var(--sigo-green-alt)]" : "rounded-md border-l-4 border-[var(--ageco-red)] bg-[color-mix(in_srgb,var(--ageco-red)_12%,white)] p-3 text-sm text-[var(--ageco-red-alt)]";
  };
  var readForm = (form) => {
    const data = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      data[key] = String(value);
    });
    form.querySelectorAll("[name]").forEach((field) => {
      var _a;
      if (field.type === "checkbox") return;
      if (field.disabled) return;
      data[field.name] = String((_a = field.value) != null ? _a : "");
    });
    form.querySelectorAll('input[type="checkbox"][name]').forEach((input) => {
      data[input.name] = input.checked ? "S\xED" : "No";
    });
    return data;
  };
  var validators = {
    desempleados: (data) => {
      var _a, _b, _c;
      const errors = {};
      if (!((_a = data.nombre) == null ? void 0 : _a.trim())) errors.nombre = "El nombre es obligatorio.";
      if (!((_b = data.email) == null ? void 0 : _b.trim())) errors.email = "El correo es obligatorio.";
      else if (!emailOk(data.email.trim())) errors.email = "Ingrese un correo v\xE1lido.";
      if (!((_c = data.telefono) == null ? void 0 : _c.trim())) errors.telefono = "El tel\xE9fono es obligatorio.";
      else if (!phoneOk(data.telefono.trim())) errors.telefono = "Ingrese un tel\xE9fono v\xE1lido.";
      if (!data.fechaIngreso) errors.fechaIngreso = "La fecha de ingreso es obligatoria.";
      if (!data.estado) errors.estado = "Seleccione un estado.";
      return errors;
    },
    emprendedores: (data) => {
      var _a, _b, _c, _d;
      const errors = {};
      if (!((_a = data.nombre) == null ? void 0 : _a.trim())) errors.nombre = "El nombre es obligatorio.";
      if (!((_b = data.negocio) == null ? void 0 : _b.trim())) errors.negocio = "El nombre del negocio es obligatorio.";
      if (!((_c = data.email) == null ? void 0 : _c.trim())) errors.email = "El correo es obligatorio.";
      else if (!emailOk(data.email.trim())) errors.email = "Ingrese un correo v\xE1lido.";
      if (!((_d = data.telefono) == null ? void 0 : _d.trim())) errors.telefono = "El tel\xE9fono es obligatorio.";
      else if (!phoneOk(data.telefono.trim())) errors.telefono = "Ingrese un tel\xE9fono v\xE1lido.";
      if (!data.fechaIngreso) errors.fechaIngreso = "La fecha de ingreso es obligatoria.";
      if (!data.etapa) errors.etapa = "Seleccione una etapa.";
      return errors;
    },
    voluntarios: (data) => {
      var _a, _b, _c;
      const errors = {};
      if (!((_a = data.nombre) == null ? void 0 : _a.trim())) errors.nombre = "El nombre es obligatorio.";
      if (!((_b = data.email) == null ? void 0 : _b.trim())) errors.email = "El correo es obligatorio.";
      else if (!emailOk(data.email.trim())) errors.email = "Ingrese un correo v\xE1lido.";
      if (!((_c = data.telefono) == null ? void 0 : _c.trim())) errors.telefono = "El tel\xE9fono es obligatorio.";
      else if (!phoneOk(data.telefono.trim())) errors.telefono = "Ingrese un tel\xE9fono v\xE1lido.";
      if (!data.tipo) errors.tipo = "Seleccione un tipo.";
      if (data.horasTotales === "" || Number.isNaN(Number(data.horasTotales))) {
        errors.horasTotales = "Indique las horas registradas.";
      } else if (Number(data.horasTotales) < 0) {
        errors.horasTotales = "Las horas no pueden ser negativas.";
      }
      return errors;
    }
  };
  var builders = {
    desempleados: (data) => {
      var _a;
      return {
        nombre: data.nombre.trim(),
        email: data.email.trim(),
        telefono: data.telefono.trim(),
        fechaIngreso: data.fechaIngreso,
        estado: data.estado || "En seguimiento",
        progreso: data.estado === "Con empleo" ? 100 : 10,
        experienciaLimpieza: data.experienciaLimpieza || "No",
        manipulacionArmas: data.manipulacionArmas || "No",
        servicioCliente: data.servicioCliente || "No",
        nivelIngles: data.nivelIngles || "Ninguno",
        licencia: data.licencia || "No",
        capacitaciones: data.capacitacion ? [data.capacitacion] : ["Inducci\xF3n Sigo Vigente"],
        asesorias: [],
        resultadosIntermedios: [],
        ultimaCapacitacion: data.capacitacion || "Inducci\xF3n Sigo Vigente",
        proximaAsesoria: data.proximaAsesoria || "\u2014",
        voluntarioAsignado: ((_a = data.voluntarioAsignado) == null ? void 0 : _a.trim()) || "Sin asignar"
      };
    },
    emprendedores: (data) => {
      var _a;
      return {
        nombre: data.nombre.trim(),
        email: data.email.trim(),
        telefono: data.telefono.trim(),
        fechaIngreso: data.fechaIngreso,
        estado: "En seguimiento",
        etapa: data.etapa,
        negocio: data.negocio.trim(),
        progreso: 15,
        seguimientoAnios: 6,
        capacitaciones: data.capacitacion ? [data.capacitacion] : ["Inducci\xF3n Emprendimiento"],
        asesorias: [],
        resultadosIntermedios: [],
        ultimaCapacitacion: data.capacitacion || "Inducci\xF3n Emprendimiento",
        proximaAsesoria: data.proximaAsesoria || "\u2014",
        voluntarioAsignado: ((_a = data.voluntarioAsignado) == null ? void 0 : _a.trim()) || "Sin asignar"
      };
    },
    voluntarios: (data) => ({
      nombre: data.nombre.trim(),
      email: data.email.trim(),
      telefono: data.telefono.trim(),
      tipo: data.tipo,
      horasTotales: Number(data.horasTotales) || 0,
      estado: data.estado || "Activo",
      asesorados: data.asesorados ? data.asesorados.split(",").map((value) => value.trim()).filter(Boolean) : [],
      historialAsesorias: [],
      capacitacionesImpartidas: data.capacitacion ? [data.capacitacion] : []
    })
  };
  var redirects = {
    desempleados: "./desempleados.html",
    emprendedores: "./emprendedores.html",
    voluntarios: "./voluntarios.html"
  };
  var saveForm = async (form) => {
    const entity = form.dataset.entityForm;
    clearErrors(form);
    const raw = readForm(form);
    const errors = validators[entity](raw);
    const entries = Object.entries(errors);
    if (entries.length) {
      entries.forEach(([name, message]) => {
        const field = form.querySelector(`[name="${name}"]`);
        if (field) showFieldError(field, message);
      });
      showAlert(form, "Revise los campos marcados antes de guardar.");
      return false;
    }
    const submitBtn = form.querySelector("[data-entity-save]");
    if (submitBtn) submitBtn.disabled = true;
    try {
      const record = builders[entity](raw);
      const saved = await fakeBucket_default.addItem(entity, record);
      sessionStorage.setItem(
        "ageco:lastAdded",
        JSON.stringify({
          entity,
          id: saved.id,
          nombre: saved.nombre,
          at: Date.now()
        })
      );
      const mode = await fakeBucket_default.getMode();
      const where = mode === "file" ? "JSON en disco (src/data)" : "bucket localStorage";
      showAlert(form, `Guardado en ${where}: ${saved.nombre}. Redirigiendo\u2026`, "success");
      window.setTimeout(() => {
        const url = new URL(redirects[entity], window.location.href);
        url.searchParams.set("nuevo", String(saved.id));
        url.searchParams.set("q", saved.nombre);
        window.location.replace(url.pathname + url.search);
      }, 250);
      return true;
    } catch (error) {
      if (submitBtn) submitBtn.disabled = false;
      showAlert(form, error.message || "No se pudo guardar el registro en el bucket local.");
      return false;
    }
  };
  var entityForm = () => {
    document.querySelectorAll("[data-entity-form]").forEach((form) => {
      if (form.dataset.entityFormReady === "true") return;
      const entity = form.dataset.entityForm;
      if (!validators[entity] || !builders[entity]) return;
      form.setAttribute("novalidate", "true");
      form.setAttribute("action", "#");
      form.setAttribute("method", "get");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        saveForm(form);
      });
      const saveBtn = form.querySelector("[data-entity-save]");
      saveBtn == null ? void 0 : saveBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        saveForm(form);
      });
      form.dataset.entityFormReady = "true";
    });
  };
  var entityForm_default = entityForm;

  // src/js/modules/entityList.js
  var badge = (label, tone) => {
    const tones = {
      success: "inline-flex items-center rounded-full bg-[var(--sigo-green)] px-3 py-1 text-xs font-semibold text-white",
      danger: "inline-flex items-center rounded-full bg-[var(--ageco-red)] px-3 py-1 text-xs font-semibold text-white",
      neutral: "inline-flex items-center rounded-full bg-[var(--ageco-gray-dark)] px-3 py-1 text-xs font-semibold text-white",
      outline: "inline-flex items-center rounded-full border border-[var(--sigo-green)] bg-white px-3 py-1 text-xs font-semibold text-[var(--sigo-green)]",
      warning: "inline-flex items-center rounded-full bg-[var(--ageco-amber)] px-3 py-1 text-xs font-semibold text-white",
      info: "inline-flex items-center rounded-full bg-[var(--ageco-info)] px-3 py-1 text-xs font-semibold text-white"
    };
    return `<span class="${tones[tone] || tones.neutral}">${label}</span>`;
  };
  var escapeHtml = (value) => String(value != null ? value : "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  var escapeAttr = (value) => String(value != null ? value : "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  var searchBlob = (item) => [
    item.id,
    item.nombre,
    item.email,
    item.telefono,
    item.estado,
    item.etapa,
    item.tipo,
    item.negocio,
    item.ultimaCapacitacion,
    item.proximaAsesoria,
    item.fechaIngreso,
    item.horasTotales,
    ...item.capacitaciones || [],
    ...item.asesorados || []
  ].filter((value) => value !== void 0 && value !== null && value !== "").join(" ");
  var rowClass = (item) => {
    const base = "border-t border-[var(--border-soft)] bg-white transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--ageco-gray)]";
    return item.esNuevo ? `${base} border-l-4 border-l-[var(--sigo-green)] bg-[color-mix(in_srgb,var(--sigo-green)_8%,white)]` : base;
  };
  var renderers = {
    desempleados: (item) => {
      const estadoTone = item.estado === "En seguimiento" ? "success" : item.estado === "Con empleo" ? "info" : "danger";
      return `
			<tr class="${rowClass(item)}" data-row-id="${item.id}" data-search="${escapeAttr(searchBlob(item))}">
				<td class="px-4 py-3 whitespace-nowrap">
					<a class="font-semibold text-[var(--ageco-red)] no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline" href="./desempleado-perfil.html?id=${item.id}">${escapeHtml(item.nombre)}</a>
					${item.esNuevo ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide text-[var(--sigo-green)]">Nuevo</span>' : ""}
				</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.fechaIngreso)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${badge(item.estado, estadoTone)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.ultimaCapacitacion)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.proximaAsesoria)}</td>
			</tr>
		`;
    },
    emprendedores: (item) => `
		<tr class="${rowClass(item)}" data-row-id="${item.id}" data-search="${escapeAttr(searchBlob(item))}">
			<td class="px-4 py-3 whitespace-nowrap">
				<a class="font-semibold text-[var(--ageco-red)] no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline" href="./emprendedor-perfil.html?id=${item.id}">${escapeHtml(item.nombre)}</a>
				${item.esNuevo ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide text-[var(--sigo-green)]">Nuevo</span>' : ""}
			</td>
			<td class="px-4 py-3">${escapeHtml(item.negocio)}</td>
			<td class="px-4 py-3 whitespace-nowrap">${badge(item.etapa, "warning")}</td>
			<td class="px-4 py-3 whitespace-nowrap">${badge(item.estado, "success")}</td>
			<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.proximaAsesoria)}</td>
		</tr>
	`,
    voluntarios: (item) => {
      const estadoTone = item.estado === "Activo" ? "success" : "danger";
      return `
			<tr class="${rowClass(item)}" data-row-id="${item.id}" data-search="${escapeAttr(searchBlob(item))}">
				<td class="px-4 py-3 whitespace-nowrap">
					<a class="font-semibold text-[var(--ageco-red)] no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline" href="./voluntario-perfil.html?id=${item.id}">${escapeHtml(item.nombre)}</a>
					${item.esNuevo ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide text-[var(--sigo-green)]">Nuevo</span>' : ""}
				</td>
				<td class="px-4 py-3 whitespace-nowrap">${badge(item.tipo, "outline")}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.horasTotales)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml((item.asesorados || []).length)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${badge(item.estado, estadoTone)}</td>
			</tr>
		`;
    }
  };
  var reinitDataTable = (root) => {
    var _a;
    root.dataset.dataTableReady = "false";
    (_a = root.querySelector("[data-data-table-pagination]")) == null ? void 0 : _a.remove();
    dataTable_default();
  };
  var readPendingFilter = (entity) => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("q") || "";
    const nuevoId = params.get("nuevo");
    let pending = null;
    try {
      pending = JSON.parse(localStorage.getItem("ageco:pendingFilter") || "null");
    } catch (e) {
      pending = null;
    }
    let session = null;
    try {
      session = JSON.parse(sessionStorage.getItem("ageco:lastAdded") || "null");
    } catch (e) {
      session = null;
    }
    const fromPending = (pending == null ? void 0 : pending.entity) === entity ? pending : null;
    const fromSession = (session == null ? void 0 : session.entity) === entity ? session : null;
    const payload = fromPending || fromSession;
    if (fromPending) {
      try {
        localStorage.removeItem("ageco:pendingFilter");
      } catch (e) {
      }
    }
    if (fromSession) {
      sessionStorage.removeItem("ageco:lastAdded");
    }
    if (payload) {
      return {
        id: payload.id,
        nombre: payload.nombre,
        query: queryParam || payload.nombre || ""
      };
    }
    if (nuevoId || queryParam) {
      return {
        id: nuevoId,
        nombre: queryParam,
        query: queryParam
      };
    }
    return null;
  };
  var showBucketBanner = async (entity, items, focus) => {
    var _a, _b;
    const host = document.querySelector("[data-entity-banner-host]") || ((_a = document.querySelector("[data-entity-count]")) == null ? void 0 : _a.parentElement);
    if (!host) return;
    (_b = host.querySelector("[data-entity-banner]")) == null ? void 0 : _b.remove();
    const mode = await fakeBucket_default.getMode();
    const newest = items.find((item) => item.esNuevo) || items[0];
    const focusName = (focus == null ? void 0 : focus.nombre) || (newest == null ? void 0 : newest.nombre);
    const focusId = (focus == null ? void 0 : focus.id) || (newest == null ? void 0 : newest.id);
    const modeLabel = mode === "file" ? 'Modo archivo: los registros se escriben en <code class="rounded bg-white/70 px-1">src/data/*-data.json</code>.' : "Modo localStorage (sin API): t\xEDpico en GitHub Pages.";
    const banner = document.createElement("div");
    banner.dataset.entityBanner = "true";
    banner.className = "mb-4 rounded-md border-l-4 border-[var(--sigo-green)] bg-[color-mix(in_srgb,var(--sigo-green)_12%,white)] p-3 text-sm text-[var(--sigo-green-alt)]";
    banner.innerHTML = `
		<strong>Bucket listo.</strong> ${modeLabel}
		${focusName ? ` \xDAltimo registro: <strong>${escapeHtml(focusName)}</strong> (id ${escapeHtml(focusId)}). Aparece primero con etiqueta <em>Nuevo</em>.` : ""}
	`;
    host.prepend(banner);
  };
  var applySearchQuery = (root, query) => {
    const search = root.querySelector("[data-data-table-search]");
    if (!search || !query) return;
    search.value = query;
    if (typeof root._dataTableApplyFilter === "function") {
      root._dataTableApplyFilter();
      return;
    }
    search.dispatchEvent(new Event("input", { bubbles: true }));
    search.dispatchEvent(new Event("keyup", { bubbles: true }));
  };
  var hydrateList = async (root) => {
    const entity = root.dataset.entityList;
    const renderer = renderers[entity];
    const tbody = root.querySelector("tbody");
    if (!renderer || !tbody) return;
    const items = await fakeBucket_default.getItems(entity);
    items.sort((a, b) => {
      const newDelta = Number(Boolean(b.esNuevo)) - Number(Boolean(a.esNuevo));
      if (newDelta !== 0) return newDelta;
      return Number(b.id) - Number(a.id);
    });
    tbody.innerHTML = items.map((item) => renderer(item)).join("");
    const mode = await fakeBucket_default.getMode();
    const countHint = document.querySelector("[data-entity-count]");
    if (countHint) {
      countHint.textContent = mode === "file" ? `${items.length} registros (JSON en disco)` : `${items.length} registros (bucket local)`;
    }
    const focus = readPendingFilter(entity);
    await showBucketBanner(entity, items, focus);
    reinitDataTable(root);
    const query = (focus == null ? void 0 : focus.query) || (focus == null ? void 0 : focus.nombre) || "";
    applySearchQuery(root, query);
    window.requestAnimationFrame(() => applySearchQuery(root, query));
  };
  var bindReset = () => {
    document.querySelectorAll("[data-entity-reset]").forEach((button) => {
      if (button.dataset.entityResetReady === "true") return;
      button.addEventListener("click", async () => {
        const entity = button.dataset.entityReset;
        const confirmed = window.confirm(
          "\xBFRestaurar los datos de demostraci\xF3n? Se perder\xE1n los registros agregados en este navegador."
        );
        if (!confirmed) return;
        await fakeBucket_default.resetCollection(entity);
        const list = document.querySelector(`[data-entity-list="${entity}"]`);
        if (list) {
          list.dataset.entityListReady = "false";
          await hydrateList(list);
          list.dataset.entityListReady = "true";
        } else {
          window.location.reload();
        }
      });
      button.dataset.entityResetReady = "true";
    });
  };
  var entityList = async () => {
    bindReset();
    const lists = [...document.querySelectorAll("[data-entity-list]")];
    if (!lists.length) return;
    await Promise.all(
      lists.map(async (root) => {
        if (root.dataset.entityListReady === "true") return;
        try {
          await hydrateList(root);
          root.dataset.entityListReady = "true";
        } catch (error) {
          console.error(error);
          const host = document.querySelector("[data-entity-banner-host]");
          if (host) {
            host.insertAdjacentHTML(
              "afterbegin",
              `<div class="mb-4 rounded-md border-l-4 border-[var(--ageco-red)] bg-[color-mix(in_srgb,var(--ageco-red)_12%,white)] p-3 text-sm text-[var(--ageco-red-alt)]">No se pudo cargar el bucket local: ${escapeHtml(error.message)}</div>`
            );
          }
        }
      })
    );
  };
  var entityList_default = entityList;

  // src/js/index.js
  var import_prismjs = __toESM(require_prism(), 1);
  var initComponents = async () => {
    internalModule_default();
    styleGuideContainer_default();
    siteHeader_default();
    entityForm_default();
    await entityList_default();
    await perfilDetalle_default();
    dataTable_default();
    import_prismjs.default.highlightAll();
  };
  document.addEventListener("DOMContentLoaded", () => {
    initComponents().catch((error) => console.error(error));
  });
})();
//# sourceMappingURL=index.js.map
