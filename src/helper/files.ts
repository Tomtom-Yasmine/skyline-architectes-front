export const getExtensionType = (fileName: string) => {
	const lastDotIndex = fileName.lastIndexOf('.');
	if (lastDotIndex === -1) return 'unknow';
	const extension = fileName.slice(lastDotIndex + 1);
	switch (extension) {
	case 'pdf':
		return 'pdf';
	case 'png':
	case 'jpg':
	case 'jpeg':
	case 'gif':
		return 'image';
	case 'xls':
	case 'xlsx':
		return 'excel';
	default:
		return 'files';
	}
};
