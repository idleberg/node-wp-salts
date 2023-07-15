declare namespace WordpressSalts {
  function wpSalts(keys: string | string[] | null, saltLength: number): string;

  type ReturnString = {
    [key: string]: string;
  }
}

export = WordpressSalts;
export as namespace WordpressSalts;
