declare namespace WordpressSalts {
	function wpSalts(keys: string | string[] | null, saltLength: number): ReturnString;

	interface ReturnString {
		[key: string]: string;
	}
}

export = WordpressSalts;
export as namespace WordpressSalts;
