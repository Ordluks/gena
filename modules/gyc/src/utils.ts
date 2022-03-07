export const fileExtExpr = (targetExt: string) =>
	new RegExp(targetExt.replaceAll('.', '\\.') + '$')