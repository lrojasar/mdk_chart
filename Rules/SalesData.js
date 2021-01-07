
var clientAPI;

/**
 * Describe this function...
 */
export default function SalesData(clientAPI) {
    //The following currentCustomer will retrieve the current customer record
    const currentCustomer = clientAPI.getPageProxy().binding.CustomerId;

    return clientAPI.read('/nortService',
        'SalesOrderHeaders', [], `$filter=CustomerId eq '${currentCustomer}'`).then(results => {
            return results.get("_array");
        });
}
