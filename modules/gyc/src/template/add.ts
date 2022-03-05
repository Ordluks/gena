import { Appdata, saveToAppdata } from '../appdata'
import { TEMPLATE_EXT } from './load'

const addTemplate = (appdata: Appdata, name: string, content: string) => {
	saveToAppdata(appdata, name + TEMPLATE_EXT, content)
}

export default addTemplate