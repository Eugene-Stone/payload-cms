import type { Config } from 'payload'

export type HtmlEditorPluginOptions = {
	mediaCollection?: string
}

export const htmlEditorPlugin =
	(options: HtmlEditorPluginOptions = {}) =>
	(config: Config): Config => {
		return config
	}
