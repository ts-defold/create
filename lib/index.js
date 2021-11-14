'use strict';

var path = require('path');
var yargs = require('yargs');
var React = require('react');
var reactRouter = require('react-router');
var ink = require('ink');
var Gradient = require('ink-gradient');
var BigText = require('ink-big-text');
var InkMarkdown = require('ink-markdown');
var chalk = require('chalk');
var Spinner = require('ink-spinner');
var fs = require('fs');
var reactFinalForm = require('react-final-form');
var semver = require('semver');
var TextInput = require('ink-text-input');
var crossSpawn = require('cross-spawn');
var fetch = require('node-fetch');
var tmp = require('tmp-promise');
var rimraf = require('rimraf');
var Zip = require('adm-zip');
var nodegit = require('nodegit');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var yargs__default = /*#__PURE__*/_interopDefaultLegacy(yargs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Gradient__default = /*#__PURE__*/_interopDefaultLegacy(Gradient);
var BigText__default = /*#__PURE__*/_interopDefaultLegacy(BigText);
var InkMarkdown__default = /*#__PURE__*/_interopDefaultLegacy(InkMarkdown);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var Spinner__default = /*#__PURE__*/_interopDefaultLegacy(Spinner);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);
var TextInput__default = /*#__PURE__*/_interopDefaultLegacy(TextInput);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var tmp__default = /*#__PURE__*/_interopDefaultLegacy(tmp);
var rimraf__default = /*#__PURE__*/_interopDefaultLegacy(rimraf);
var Zip__default = /*#__PURE__*/_interopDefaultLegacy(Zip);
var nodegit__default = /*#__PURE__*/_interopDefaultLegacy(nodegit);

function Markdown({ children, ...props }) {
  return /* @__PURE__ */ React__default["default"].createElement(InkMarkdown__default["default"], {
    html: chalk__default["default"].cyan,
    link: chalk__default["default"].blueBright,
    strong: chalk__default["default"].green,
    em: chalk__default["default"].yellowBright,
    codespan: chalk__default["default"].dim,
    ...props
  }, children);
}

const makeGradient = () => {
  const GRADIENT = [
    { h: 0, s: 1, v: 1, a: 1 },
    { h: 90, s: 1, v: 1, a: 1 },
    { h: 180, s: 1, v: 1, a: 1 },
    { h: 270, s: 1, v: 1, a: 1 },
    { h: 360, s: 1, v: 1, a: 1 }
  ];
  const theta = new Date().getSeconds() * 6;
  return GRADIENT.map((stop, index) => ({
    ...stop,
    h: (theta + index * 90) % 360
  }));
};
function Help({ text }) {
  return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    alignItems: "center",
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(Gradient__default["default"], {
    colors: makeGradient()
  }, /* @__PURE__ */ React__default["default"].createElement(BigText__default["default"], {
    text: "TS-DEFOLD",
    font: "simple3d",
    letterSpacing: 0,
    space: false
  })), /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, /* @__PURE__ */ React__default["default"].createElement(Markdown, null, text)));
}

function useProjectApply(dir, config) {
  const [info, setInfo] = React.useState({
    isLoading: true,
    complete: false,
    error: ""
  });
  React.useEffect(() => {
    let pending = true;
    (async () => {
      try {
        const packageJson = JSON.parse(await fs__default["default"].promises.readFile(path__default["default"].join(dir, "package.json"), "utf8"));
        packageJson.private = true;
        packageJson.name = config.name;
        packageJson.version = config.version;
        packageJson.description = config.description;
        packageJson.author = config.author;
        delete packageJson.repository;
        delete packageJson.license;
        const keyOrder = [
          "private",
          "name",
          "version",
          "description",
          "author"
        ];
        const keys = keyOrder.reduce((acc, key) => ({ ...acc, key }), {});
        JSON.stringify(packageJson, (key, value) => {
          if (!(key in keys))
            keyOrder.push(key);
          return value;
        });
        await fs__default["default"].promises.writeFile(path__default["default"].join(dir, "package.json"), JSON.stringify(packageJson, keyOrder, 2));
        if (pending) {
          setInfo((i) => ({ ...i, isLoading: false, complete: true }));
        }
      } catch (e) {
        const error = e;
        if (pending) {
          setInfo((i) => ({
            ...i,
            isLoading: false,
            error: error.message
          }));
        }
      }
    })();
    return () => {
      pending = false;
    };
  }, [dir, config]);
  return info;
}

function ProjectApply({
  dir,
  config,
  active,
  onCompletion
}) {
  const apply = useProjectApply(dir, config);
  React.useEffect(() => {
    if (active && !apply.isLoading) {
      if (apply.error) {
        onCompletion == null ? void 0 : onCompletion(false);
      } else if (apply.complete) {
        onCompletion == null ? void 0 : onCompletion(true);
      }
    }
  }, [apply, active, onCompletion]);
  if (apply.isLoading) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "cyanBright"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "hamburger"
    })), " ", "Applying project configuration"));
  } else if (apply.error) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "\u{10102}"), " Project configuration failed!"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "  ", apply.error));
  }
  return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "\u2713"), " Applied project configuration");
}

function FormInput({
  onFocus,
  onBlur,
  ...props
}) {
  React.useEffect(() => {
    onFocus == null ? void 0 : onFocus();
    return onBlur == null ? void 0 : onBlur();
  }, [onFocus, onBlur]);
  return /* @__PURE__ */ React__default["default"].createElement(TextInput__default["default"], {
    ...props,
    showCursor: true
  });
}

function FormError({ children }) {
  return /* @__PURE__ */ React__default["default"].createElement(ink.Box, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "red"
  }, children));
}

function ProjectConfig({
  author,
  email,
  project,
  active,
  onConfigured,
  onCompletion
}) {
  const [activeField, setActiveField] = React.useState(0);
  const fields = React.useMemo(() => {
    return [
      {
        name: "name",
        label: "Project Name",
        validate: (value) => {
          if (!value) {
            return "Required";
          }
        },
        format: (value) => value ? value.toLowerCase().replace(/[^a-z \\-]/g, "").replace(/ /g, "-") : "",
        placeholder: project.name || "my-awesome-game"
      },
      {
        name: "version",
        label: "Version",
        placeholder: "0.1.0",
        format: (value) => value === void 0 ? "" : value.replace(/[^0-9.]/g, ""),
        validate: (value) => !value ? "Required" : semver__default["default"].valid(value) ? void 0 : "Invalid semantic version"
      },
      {
        name: "description",
        label: "Description",
        placeholder: `My Awesome ${games[Math.trunc(Math.random() * games.length - 1)]} Game!`,
        format: (value) => value === void 0 ? "" : value,
        validate: (value) => !value ? "Required" : void 0
      },
      {
        name: "author",
        label: "Author",
        placeholder: author + (email ? ` <${email}>` : ""),
        format: (value) => value === void 0 ? "" : value,
        validate: (value) => !value ? "Required" : void 0
      }
    ];
  }, [author, email, project]);
  const onSubmit = (values) => {
    onConfigured == null ? void 0 : onConfigured(values);
    if (active)
      onCompletion == null ? void 0 : onCompletion(true);
  };
  return /* @__PURE__ */ React__default["default"].createElement(reactFinalForm.Form, {
    onSubmit,
    initialValues: {
      ...fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})
    },
    render: ({ handleSubmit }) => /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, fields.map(({ name, label, placeholder, format, validate }, index) => /* @__PURE__ */ React__default["default"].createElement(reactFinalForm.Field, {
      name,
      key: name,
      format,
      validate
    }, ({ input, meta }) => /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Box, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      bold: activeField === index
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: meta.error && !meta.pristine ? "red" : meta.valid ? "green" : "cyanBright"
    }, activeField === index ? "\u276F " : meta.touched ? "\u2713 " : "  "), `${label}: `), activeField === index ? /* @__PURE__ */ React__default["default"].createElement(FormInput, {
      ...input,
      tabComplete: true,
      placeholder,
      onSubmit: () => {
        if (meta.valid && !meta.validating) {
          setActiveField((value) => value + 1);
          if (activeField === fields.length - 1) {
            handleSubmit();
          }
        }
      }
    }) : /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: !meta.touched || !input.value ? "gray" : void 0
    }, input.value || placeholder), meta.validating && name === "name" && /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      marginLeft: 1
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "yellow"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "dots"
    })))), meta.error && meta.touched && !meta.pristine && /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      paddingLeft: 2
    }, /* @__PURE__ */ React__default["default"].createElement(FormError, null, meta.error))))))
  });
}
const games = [
  "RPG",
  "SHMUP",
  "FPS",
  "Platformer",
  "Tower Defense",
  "Puzzle",
  "Racing",
  "Action",
  "Adventure",
  "Strategy",
  "Simulation",
  "MMORPG",
  "Battle Royal"
];

function ProjectDir({
  project,
  active,
  onCompletion
}) {
  React.useEffect(() => {
    if (active && !project.isLoading) {
      if (project.exists || !project.isEmpty) {
        onCompletion == null ? void 0 : onCompletion(false);
      } else {
        onCompletion == null ? void 0 : onCompletion(true);
      }
    }
  }, [project, active, onCompletion]);
  if (project.isLoading) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "cyanBright"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "hamburger"
    })), " ", "Checking project directory"));
  } else if (project.exists || !project.isEmpty) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "\u{10102}"), " Project directory at", " ", /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, project.relativePath || "."), " already exists!"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "grey"
    }, "Please choose an empty or new directory for your project."));
  }
  return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "\u2713"), " Creating new project in", " ", /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, project.relativePath));
}

function useDependencyInstall(dir) {
  const [install, setInstall] = React.useState({
    isLoading: true,
    complete: false,
    progress: "",
    errors: []
  });
  React.useEffect(() => {
    var _a;
    let output;
    const child = crossSpawn.spawn("npm", ["ci", "--no-audit", "--no-progress", "--verbose"], {
      cwd: dir,
      stdio: "pipe"
    });
    function process(data) {
      var _a2;
      output += data.toString();
      const lines = output.split("\n");
      if (!output.endsWith("\n"))
        output = (_a2 = lines.pop()) != null ? _a2 : "";
      const module = lines.map((l) => l.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "")).map((line) => {
        var _a3, _b;
        return (_b = (_a3 = /.*reifyNode:node_modules\/(?<module>[^\s]+)/.exec(line)) == null ? void 0 : _a3.groups) == null ? void 0 : _b.module;
      }).filter((l) => l).pop();
      if (module) {
        setInstall((i) => ({
          ...i,
          progress: module
        }));
      }
    }
    (_a = child.stderr) == null ? void 0 : _a.on("data", process);
    child.on("close", (code) => {
      if (code === 0) {
        setInstall((i) => ({
          ...i,
          isLoading: false,
          complete: true
        }));
      } else {
        setInstall((i) => ({
          ...i,
          isLoading: false,
          complete: false,
          errors: [
            "Failed to install dependencies",
            "run npm install for details"
          ]
        }));
      }
    });
    return () => {
      child.kill();
    };
  }, [dir]);
  return install;
}

function ProjectInstall({
  dir,
  active,
  onCompletion
}) {
  const install = useDependencyInstall(dir);
  React.useEffect(() => {
    if (active) {
      if (install.complete) {
        onCompletion == null ? void 0 : onCompletion(true);
      } else if (install.errors.length > 0) {
        onCompletion == null ? void 0 : onCompletion(false);
      }
    }
  }, [install, active, onCompletion]);
  if (install.isLoading) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "row"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "cyanBright"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "hamburger"
    })), " ", "Installing dependencies", " ", install.progress && /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "grey"
    }, install.progress)));
  } else if (install.errors.length > 0) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "\u{10102}"), " Dependency installation failed!"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "  ", install.errors.join("\n  ")));
  }
  return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "\u2713"), " Installed dependencies");
}

function ProjectReady({
  project,
  active,
  onCompletion
}) {
  React.useEffect(() => {
    if (active)
      onCompletion == null ? void 0 : onCompletion(true);
  }, [active, onCompletion]);
  return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    paddingTop: 1,
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, "\u{1F680} Your project is ready to go!"), /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    paddingTop: 1,
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, "Next Steps:"), /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    paddingLeft: 2,
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(Markdown, null, `cd *${project}*`), /* @__PURE__ */ React__default["default"].createElement(Markdown, null, "**npm** run dev"), /* @__PURE__ */ React__default["default"].createElement(Markdown, null, "Open *app/game.project* in the Defold editor.")), /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    width: 46,
    alignItems: "center",
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    paddingTop: 1,
    flexDirection: "row"
  }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, "TypeScript "), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "red"
  }, "\u2764\uFE0F "), /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, " Defold")))));
}

function TemplateInfo({
  template,
  active,
  onCompletion
}) {
  React.useEffect(() => {
    if (active && !template.isLoading) {
      onCompletion == null ? void 0 : onCompletion(template.found);
    }
  }, [template, active, onCompletion]);
  if (template.isLoading) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "cyanBright"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "hamburger"
    })), " ", "Getting Template Info"));
  } else if (!template.found) {
    if (template.rate) {
      return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
        color: "red"
      }, "\u{10102}"), " The api is rate limited, try again in", " ", /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
        color: "yellow"
      }, Math.ceil(template.rate / 60)), " ", Math.ceil(template.rate / 60) > 1 ? "minutes" : "minute");
    } else {
      return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
        flexDirection: "column"
      }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
        color: "red"
      }, "\u{10102}"), " The template", " ", /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
        color: "red"
      }, template.name), " was not found!"), template.match ? /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
        color: "grey"
      }, "Are you looking for ", /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
        color: "yellow"
      }, template.match), " ", "instead?") : /* @__PURE__ */ React__default["default"].createElement(Markdown, null, "`Try:` https://github.com/search?q=tsd-template&type=repositories"));
    }
  }
  return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "\u2713"), " Using project template", " ", /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, template.name));
}

function useFileDownload(url, file = "") {
  const [download, setDownload] = React.useState({
    isLoading: true,
    complete: false,
    error: "",
    progress: 0,
    total: 0,
    url,
    file
  });
  React.useEffect(() => {
    let pending = true;
    (async () => {
      const req = await fetch__default["default"](url);
      if (req.status === 200) {
        const dest = file ? file : (await tmp__default["default"].file({ postfix: ".zip", keep: true })).path;
        const stream = fs__default["default"].createWriteStream(dest);
        if (pending) {
          setDownload((a) => ({
            ...a,
            file: dest,
            total: Number(req.headers.get("content-length") || 1)
          }));
        }
        req.body.on("data", (chunk) => {
          stream.write(chunk);
          if (pending) {
            setDownload((a) => ({
              ...a,
              progress: a.progress + chunk.length
            }));
          }
        });
        req.body.on("end", () => {
          stream.end(() => {
            if (pending) {
              setDownload((a) => ({
                ...a,
                isLoading: false,
                complete: true,
                progress: a.total > 0 ? a.total : a.progress
              }));
            }
          });
        });
      } else {
        if (pending) {
          setDownload((a) => ({
            ...a,
            isLoading: false,
            error: `${req.status} ${req.statusText}`
          }));
        }
      }
    })();
    return () => {
      pending = false;
    };
  }, [url, file]);
  return download;
}

function TemplateDownload({
  url,
  active,
  onDownloaded,
  onCompletion
}) {
  const download = useFileDownload(url);
  const label = "Downloading template ";
  React.useEffect(() => {
    if (active) {
      if (download.complete) {
        onDownloaded == null ? void 0 : onDownloaded(download.file);
        onCompletion == null ? void 0 : onCompletion(true);
      } else if (download.error) {
        onCompletion == null ? void 0 : onCompletion(false);
      }
    }
  }, [download, active, onCompletion, onDownloaded]);
  if (download.isLoading) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "row"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "cyanBright"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "hamburger"
    })), " ", label, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "grey"
    }, `${Number(download.progress / 1024).toFixed(2)} KB`)));
  } else if (download.error) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "\u{10102}"), " Template download failed!"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "  ", download.error), /* @__PURE__ */ React__default["default"].createElement(Markdown, null, `\`URL\`: ${url}`));
  }
  return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "\u2713"), " Downloaded template archive");
}

function useUnzip(src, dest = "", cleanup = false) {
  const [unzip, setUnzip] = React.useState({
    isLoading: true,
    complete: false,
    error: "",
    src,
    dest,
    progress: ""
  });
  React.useEffect(() => {
    let pending = true;
    (async () => {
      const zip = new Zip__default["default"](src);
      const entries = zip.getEntries();
      const packageEntry = entries.find((entry) => entry.name === "package.json");
      if (packageEntry) {
        const parts = packageEntry.entryName.split("/");
        const root = (parts.length > 1 ? parts.slice(0, parts.length - 1).join("/") : "") + "/";
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.entryName.startsWith(root) && entry.entryName !== root && !entry.entryName.endsWith("/")) {
            const relEntry = entry.entryName.replace(root, "");
            const destPath = path__default["default"].join(dest, path__default["default"].dirname(relEntry), "/");
            fs.mkdir(destPath, { recursive: true }, () => null);
            if (pending) {
              setUnzip((z) => ({ ...z, progress: relEntry }));
              await new Promise((resolve) => setTimeout(resolve, 1));
            }
            zip.extractEntryTo(entry.entryName, destPath, false, false);
          }
        }
        if (cleanup)
          rimraf__default["default"](src, () => null);
        if (pending) {
          setUnzip((z) => ({ ...z, isLoading: false, complete: true }));
        }
      } else {
        if (cleanup) {
          rimraf__default["default"](src, () => null);
          rimraf__default["default"](dest, () => null);
        }
        if (pending) {
          setUnzip((z) => ({
            ...z,
            isLoading: false,
            error: "No package.json"
          }));
        }
      }
    })();
    return () => {
      pending = false;
    };
  }, [src, dest, cleanup]);
  return unzip;
}

function TemplateUnzip({
  src,
  dest,
  remove,
  active,
  onCompletion
}) {
  const unzip = useUnzip(src, dest, remove);
  React.useEffect(() => {
    if (active) {
      if (unzip.complete) {
        onCompletion == null ? void 0 : onCompletion(true);
      } else if (unzip.error) {
        onCompletion == null ? void 0 : onCompletion(false);
      }
    }
  }, [unzip, active, onCompletion]);
  if (unzip.isLoading) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "row"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "cyanBright"
    }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
      type: "hamburger"
    })), " ", "Extracting template", " ", unzip.progress && /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "grey"
    }, unzip.progress)));
  } else if (unzip.error) {
    return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "\u{10102}"), " Template extraction failed!"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
      color: "red"
    }, "  ", unzip.error));
  }
  return /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "\u2713"), " Extracted template archive");
}

function Wizard({
  children,
  step,
  exclusive
}) {
  const matches = [];
  React__default["default"].Children.forEach(children, (child) => {
    var _a;
    if (React__default["default"].isValidElement(child)) {
      const tl = (_a = child.props.index) != null ? _a : Number.MAX_VALUE;
      const match = exclusive ? tl == step ? child : null : tl <= step ? child : null;
      if (match)
        matches.push(match);
    }
  });
  if (exclusive) {
    return matches.length > 0 ? React__default["default"].cloneElement(matches[0], { step, active: true }) : null;
  }
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, matches.map((match, index) => React__default["default"].cloneElement(match, {
    step,
    key: index,
    active: match.props.index == step,
    complete: match.props.index < step
  })));
}
function Step({
  children,
  index,
  active,
  complete
}) {
  const childrenWithProps = React__default["default"].Children.map(children, (child) => {
    if (React__default["default"].isValidElement(child)) {
      return React__default["default"].cloneElement(child, { step: index, active, complete });
    }
    return child;
  });
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, childrenWithProps);
}

function useGitConfig() {
  const [config, setConfig] = React.useState({
    user: "",
    email: ""
  });
  React.useEffect(() => {
    let pending = true;
    (async () => {
      try {
        const config2 = await nodegit__default["default"].Config.openDefault();
        const cfg = {
          user: (await config2.getStringBuf("user.name")).toString(),
          email: (await config2.getStringBuf("user.email")).toString()
        };
        if (pending)
          setConfig(cfg);
      } catch (e) {
        //! ignore
      }
    })();
    return () => {
      pending = false;
    };
  }, []);
  return config;
}

function useProjectDir(dir) {
  const [results, setResults] = React.useState({
    isLoading: true,
    exists: false,
    isEmpty: false,
    relativePath: "",
    name: ""
  });
  React.useEffect(() => {
    let pending = true;
    (async () => {
      var _a;
      const exists = !!await new Promise((r) => fs__default["default"].access(dir, fs__default["default"].constants.F_OK, (e) => r(!e)));
      const stats = {
        isLoading: false,
        exists,
        isEmpty: exists ? await (async () => {
          const itr = await fs__default["default"].promises.opendir(dir);
          const { done } = await itr[Symbol.asyncIterator]().next();
          if (!done)
            itr.close();
          return !!done;
        })() : true,
        relativePath: path__default["default"].relative((_a = process.env.INIT_CWD) != null ? _a : process.cwd(), dir),
        name: path__default["default"].basename(dir)
      };
      if (pending)
        setResults(stats);
    })();
    return () => {
      pending = false;
    };
  }, [dir]);
  return results;
}

function useFetchTemplate(template) {
  const [archive, setArchive] = React.useState({
    isLoading: true,
    found: false,
    match: "",
    url: "",
    name: ""
  });
  React.useEffect(() => {
    let pending = true;
    (async () => {
      const slug = template && (template.startsWith("tsd-template-") ? template : `tsd-template-${template}`) || "tsd-template";
      const payload = { isLoading: false };
      const req = await fetch__default["default"](`https://api.github.com/search/repositories?q=${slug}&sort=stars`);
      if (req.status === 200) {
        const json = await req.json();
        const results = json.items.filter((item) => item.name.startsWith("tsd-template"));
        const exact = results.find((item) => item.name === slug);
        const match = results.length && results[0] || void 0;
        const url = exact ? exact.archive_url.replace("{archive_format}", "zipball").replace("{/ref}", `/${exact.default_branch}`) : "";
        payload.found = !!exact;
        payload.match = !exact && match ? match.name.replace("tsd-template-", "") : "";
        payload.url = url;
        payload.name = exact ? exact.name : template;
      } else if (req.status === 403) {
        const reset = req.headers.get("X-RateLimit-Reset");
        if (reset) {
          payload.found = false;
          payload.rate = parseInt(reset) - Date.now();
        }
      }
      if (pending)
        setArchive((a) => ({ ...a, ...payload }));
    })();
    return () => {
      pending = false;
    };
  }, [template]);
  return archive;
}

function Project({ dir, template }) {
  const [config, setConfig] = React.useState();
  const [archivePath, setArchivePath] = React.useState();
  const history = reactRouter.useHistory();
  const { exit } = ink.useApp();
  const { step } = reactRouter.useParams();
  const currentStep = step ? parseInt(step) : 0;
  const { user: author, email } = useGitConfig();
  const project = useProjectDir(dir);
  const templateInfo = useFetchTemplate(template);
  const onWizardNext = (success) => {
    if (currentStep == 7)
      exit();
    if (success) {
      history.push(`/project/${currentStep + 1}`);
    } else {
      exit(new Error());
    }
  };
  return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(Wizard, {
    step: currentStep
  }, /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 0,
    name: "Project Directory"
  }, /* @__PURE__ */ React__default["default"].createElement(ProjectDir, {
    project,
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 1,
    name: "Template Info"
  }, /* @__PURE__ */ React__default["default"].createElement(TemplateInfo, {
    template: templateInfo,
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 2,
    name: "Project Configuration"
  }, /* @__PURE__ */ React__default["default"].createElement(ProjectConfig, {
    author,
    email,
    project,
    onConfigured: (v) => setConfig(v),
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 3,
    name: "Download Template"
  }, /* @__PURE__ */ React__default["default"].createElement(TemplateDownload, {
    url: templateInfo.url,
    onDownloaded: (f) => setArchivePath(f),
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 4,
    name: "Extract Template"
  }, archivePath && /* @__PURE__ */ React__default["default"].createElement(TemplateUnzip, {
    src: archivePath,
    dest: dir,
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 5,
    name: "Apply Config"
  }, config && /* @__PURE__ */ React__default["default"].createElement(ProjectApply, {
    dir,
    config,
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 6,
    name: "Install Dependencies"
  }, /* @__PURE__ */ React__default["default"].createElement(ProjectInstall, {
    dir,
    onCompletion: onWizardNext
  })), /* @__PURE__ */ React__default["default"].createElement(Step, {
    index: 7,
    name: "Project Ready"
  }, /* @__PURE__ */ React__default["default"].createElement(ProjectReady, {
    project: project.relativePath,
    onCompletion: onWizardNext
  }))));
}

function DevServer() {
  return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(ink.Text, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "cyanBright"
  }, /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
    type: "hamburger"
  })), "  Watching for changes"), /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    flexDirection: "column",
    marginTop: 1
  }, /* @__PURE__ */ React__default["default"].createElement(ink.Box, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "./src/player.script.ts"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "gray"
  }, " [1.3 Kb] (21ms)")), /* @__PURE__ */ React__default["default"].createElement(ink.Box, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "green"
  }, "./src/orbit.script.ts"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "gray"
  }, " [1.3 Kb] (21ms)")), /* @__PURE__ */ React__default["default"].createElement(ink.Box, null, /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "yellow"
  }, "./src/hooks.editor_script.ts"), /* @__PURE__ */ React__default["default"].createElement(ink.Text, {
    color: "gray"
  }, " ", /* @__PURE__ */ React__default["default"].createElement(Spinner__default["default"], {
    type: "simpleDots"
  })))));
}

const CLI = ({ path, data }) => {
  const { help, dir, template } = React.useMemo(() => {
    const { help: help2, dir: dir2, template: template2 } = data;
    return { help: help2 != null ? help2 : "", dir: dir2 != null ? dir2 : "", template: template2 != null ? template2 : "" };
  }, [data]);
  return /* @__PURE__ */ React__default["default"].createElement(ink.Box, {
    width: 80,
    flexDirection: "column"
  }, /* @__PURE__ */ React__default["default"].createElement(reactRouter.MemoryRouter, {
    initialEntries: [path],
    initialIndex: 0
  }, /* @__PURE__ */ React__default["default"].createElement(reactRouter.Switch, null, /* @__PURE__ */ React__default["default"].createElement(reactRouter.Route, {
    path: "/help"
  }, /* @__PURE__ */ React__default["default"].createElement(Help, {
    text: help
  })), /* @__PURE__ */ React__default["default"].createElement(reactRouter.Route, {
    path: "/project/:step?"
  }, /* @__PURE__ */ React__default["default"].createElement(Project, {
    dir,
    template
  })), /* @__PURE__ */ React__default["default"].createElement(reactRouter.Route, {
    path: "/serve"
  }, /* @__PURE__ */ React__default["default"].createElement(DevServer, null)))));
};
function App(path, data) {
  const instance = ink.render(/* @__PURE__ */ React__default["default"].createElement(CLI, {
    path,
    data
  }));
  return instance.waitUntilExit();
}

yargs__default["default"].scriptName("").usage("Usage: **npm** init @ts-defold <project-directory> -- `[options]`").positional("project-directory", {
  describe: "Empty directory to initialize project in",
  type: "string"
}).options({
  template: {
    describe: "Starting template for project",
    type: "string"
  },
  serve: {
    describe: "Start a dev server and file watcher",
    type: "boolean"
  }
}).command("*", "Generate a new project", () => null, async (argv) => {
  var _a;
  try {
    if (argv._.length == 1) {
      if (argv.serve) {
        await App(`/serve`);
      } else {
        await App(`/project`, {
          dir: path__default["default"].resolve((_a = process.env.INIT_CWD) != null ? _a : process.cwd(), argv._[0].toString()),
          template: argv.template
        });
      }
    } else {
      await App("/help", { help: await yargs__default["default"].getHelp() });
    }
  } catch (e) {
  }
  process.exit(0);
}).version().epilogue("For more information on `templates` and the `dev server` see:\nhttps://github.com/ts-defold/create#readme\n").help().argv;
//# sourceMappingURL=index.js.map
