// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var stringsCopieds = [];

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "stackCopy" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let copy = vscode.commands.registerCommand('extension.copy', function () {
        // The code you place here will be executed every time your command is executed
        //vscode.window.showInformationMessage();
        var activeText = vscode.window.activeTextEditor;
        var result = activeText.document.getText(activeText.selection);
        
        //console.log( result._documentData._lines[0]);
        // Display a message box to the user
        stringsCopieds.push(result);
       
        vscode.window.showInformationMessage('Posição adicionada: ' + (stringsCopieds.length - 1));
    });
    let paste_and_pop = vscode.commands.registerCommand('extension.paste_and_pop', function () {
        var result = stringsCopieds.pop();
        var activeText = vscode.window.activeTextEditor;
       activeText.edit(editBuilder => {
        editBuilder.insert(activeText.selection.start, result);
    });
        vscode.window.showInformationMessage('Paste and Pop! Remaining:' + (stringsCopieds.length));
    });
    let paste_and_keep = vscode.commands.registerCommand('extension.paste_and_keep', function(){
        var size = stringsCopieds.length;
        size = size - 1;
        var result = stringsCopieds[size];
        var activeText = vscode.window.activeTextEditor;
        activeText.edit(editBuilder => {
            editBuilder.insert(activeText.selection.start, result);
        });
        vscode.window.showInformationMessage('Paste and Keep! Remaining:' + (stringsCopieds.length));
    });
    context.subscriptions.push(paste_and_pop);
    context.subscriptions.push(copy);
    context.subscriptions.push(paste_and_keep);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;