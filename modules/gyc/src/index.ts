import initAppdata, { createAppdataWorker } from './appdata'
import { createTemplateWorker } from './template/template'

const appdata = initAppdata()
const appdataWorker = createAppdataWorker(appdata)
const templateWorker = createTemplateWorker(appdataWorker)

const GYC = templateWorker

export = GYC

// templateWorker.generateYourComponent({
// 	template: 'newTemplate',
// 	name: 'New',
// 	path: 'C:\\Users\\yakov\\Desktop'
// })

// templateWorker.add('newTemplate',
// `module.exports = {
// 	'##name;Folder ##=rootFolder': {
// 		'file.txt': '##rootFolder'
// 	}
// }
// `)

console.log(templateWorker.list())