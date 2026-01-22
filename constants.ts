
export const BRANCHES = [
  'Ahmedabad', 'Banglore', 'Delhi', 'Jaipur', 'Kolkata', 'Ludhiana', 'Mumbai', 'Surat', 'Tirupur', 'Ulhasnagar'
].sort();

export const BRANCH_SALES_PERSONS: Record<string, string[]> = {
  Mumbai: ['Amit Korgaonkar', 'Santosh Pachratkar', 'Rakesh Jain', 'Kamlesh Sutar', 'Pradeep Jadhav', 'Mumbai HO'],
  Ulhasnagar: ['Shiv Ratan', 'Viay Sutar', 'Ulasnagar HO'],
  Kolkata: ['Rajesh Jain', 'Kolkata HO'],
  Jaipur: ['Durgesh Bhati', 'Jaipur HO'],
  Delhi: ['Lalit Maroo', 'Anish Jain', 'Suresh Nautiyal', 'Rahul Vashishtha', 'Mohit Sharma', 'Delhi HO'],
  Banglore: ['Balasubramanyam', 'Tarachand', 'Bangalore HO'],
  Tirupur: ['Alexander Pushkin', 'Subramanian', 'Mani Maran', 'Tirupur HO'],
  Ahmedabad: ['ravindra kaushik', 'Ahmedabad HO'],
  Surat: ['Anil Marthe', 'Raghuveer Darbar', 'Sailesh Pathak', 'Vanraj Darbar', 'Surat HO'],
  Ludhiana: ['Ludhiana HO']
};

export const CATEGORIES = [
  'CKU', 
  'CRO', 
  'CUP', 
  'ELASTIC', 
  'EMBROIDARY', 
  'EYE_N_HOOK', 
  'PRINTING', 
  'TLU', 
  'VAU', 
  'WARP(UDHANA)'
].sort();

export const UOMS = ['INCH', 'KG', 'MRT', 'PCS', 'PKT', 'ROLL', 'YARD'];
