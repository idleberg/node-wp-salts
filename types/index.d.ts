declare namespace WordpressSalts {
	function wpSalts(keys: string | string[] | null, saltLength: number): Record<string, string>;
}

export default WordpressSalts;
