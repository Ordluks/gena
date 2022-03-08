import initAppdata, { createAppdataWorker } from './appdata'
import { createTemplateWorker } from './template/template'

const appdata = initAppdata()
const appdataWorker = createAppdataWorker(appdata)
const templateWorker = createTemplateWorker(appdataWorker)

const GYC = templateWorker

export = GYC