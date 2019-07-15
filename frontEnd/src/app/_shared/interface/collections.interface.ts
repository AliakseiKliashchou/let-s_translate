export interface CollectionsInterface {
 id: number,
 idCustomer: number,
 idOrders: [{
     date: string,
     download: string,
     email: string,
     id: number,
     idCustomer: number,
     name: string,
     originalLanguage: string,
     progress: number,
     review: boolean,
     tags: [string],
     title: string,
     translateLanguage: string,
     urgency: number
 }],
 title: string
}
  