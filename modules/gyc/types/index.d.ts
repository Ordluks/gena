declare module 'gyc' {
	export interface Template {
		[key: string]: Template | string
	}

	interface GenerateSetting {
		template: string
		name: string,
		path: string
	}

	const GYC: {
		load: (name: string) => void | Template
    addNew: (name: string, content: string) => void
    remove: (name: string) => void
    list: () => string[]
    generateYourComponent: (setts: GenerateSetting) => void
	}

	export default GYC
}