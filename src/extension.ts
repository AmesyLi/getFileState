// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	console.log('插件已激活');

	let disposable = vscode.commands.registerCommand('getFileState', (url) => {
		//文件路径
		const filePath = url.path.substring(1);
		fs.stat(filePath, (err: any, stats: fs.Stats) => {
			if (err) {
				vscode.window.showErrorMessage('获取文件时遇到错误了'+err);
				return;
			}
			if (stats.isDirectory()) {
				vscode.window.showInformationMessage('这是一个文件夹，不是文件');
				return;
			}else if(stats.isFile()){
				const size = stats.size;
				const createTime = stats.birthtime.toLocaleString();
				const modifyTime = stats.mtime.toLocaleString();
				const atime =stats.atime.toLocaleString();
				vscode.window.showInformationMessage(`
					文件大小：${size}字节;
					文件创建时间：${createTime};
					文件修改时间：${modifyTime};
					文件最后访问时间：${atime};
				`,{modal:true});
			}
			
		})
		const stats = fs.statSync(filePath);
		console.log('stats', stats);
		console.log('isFile', stats.isFile());
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
