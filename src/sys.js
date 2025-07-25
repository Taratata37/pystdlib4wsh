
var sys = {
    argv: (function() {
        var args = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args.push(WScript.Arguments.Item(i));
        }
        return args;
    })(),

    platform: (function() {
        var shell = new ActiveXObject("WScript.Shell");
        var env = shell.Environment("Process");
        return env("PROCESSOR_ARCHITECTURE") || "unknown";
    })(),

    version: "WSH-JScript 1.0",

    exit: function(code) {
        WScript.Quit(code || 0);
    },

    stdout: {
        write: function(text) {
            WScript.StdOut.Write(text);
        },
        writeln: function(text) {
            WScript.StdOut.WriteLine(text);
        }
    },

    stderr: {
        write: function(text) {
            WScript.StdErr.Write(text);
        },
        writeln: function(text) {
            WScript.StdErr.WriteLine(text);
        }
    }
};
