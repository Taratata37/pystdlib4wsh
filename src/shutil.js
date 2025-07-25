
// shutil.js - Module pour pystdlib4wsh
var shutil = (function () {
    var fso = new ActiveXObject("Scripting.FileSystemObject");

    function copyfile(src, dst) {
        if (!fso.FileExists(src)) {
            throw new Error("Source file does not exist: " + src);
        }
        fso.CopyFile(src, dst, true); // true = overwrite
    }

    function move(src, dst) {
        if (!fso.FileExists(src) && !fso.FolderExists(src)) {
            throw new Error("Source does not exist: " + src);
        }
        fso.MoveFile(src, dst); // fonctionne aussi pour les dossiers
    }

    function rmtree(path) {
        if (fso.FolderExists(path)) {
            fso.DeleteFolder(path, true); // true = force
        } else if (fso.FileExists(path)) {
            fso.DeleteFile(path, true);
        } else {
            throw new Error("Path does not exist: " + path);
        }
    }

    function copytree(src, dst) {
        if (!fso.FolderExists(src)) {
            throw new Error("Source folder does not exist: " + src);
        }
        fso.CopyFolder(src, dst, true);
    }

    return {
        copyfile: copyfile,
        move: move,
        rmtree: rmtree,
        copytree: copytree
    };
})();
