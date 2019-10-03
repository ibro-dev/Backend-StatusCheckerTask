
const cheerio = require("cheerio");
const axios = require("axios");
const siteUrldatadoghq = "https://status.datadoghq.com/";
const siteUrlazure = "https://status.azure.com/en-gb/status";

const fetchDataFromAzure = async () => {
    try {     
       const result = await axios.get(siteUrlazure);
       const $ = cheerio.load(result.data);
       azureArr = [];
       coveragesData = [];
       $('table.region-status-table tbody tr td').each((i, elem) => { 
        let str = $(elem).text().trim();
        coveragesData.push(str);        
      });
      azureArr.push(
        {name: coveragesData[14], status: coveragesData[16], region: "EAST US", url: siteUrlazure},
        {name: coveragesData[14], status: coveragesData[17], region: "EAST US2", url: siteUrlazure},
        {name: coveragesData[105], status: coveragesData[17], region: "EAST US", url: siteUrlazure},
        {name: coveragesData[105], status: coveragesData[17], region: "EAST US2", url: siteUrlazure},
        {name: coveragesData[66], status: coveragesData[17], region: "EAST US", url: siteUrlazure},
        {name: coveragesData[66], status: coveragesData[17], region: "EAST US2", url: siteUrlazure}); 

        return azureArr;
    }
    catch (error) {
       console.log(error);  
    }
};

const fetchDataFromDatadoghq = async () => {
    try {     
        const result = await axios.get(siteUrldatadoghq);
        const $ = cheerio.load(result.data);
        datadogArr = [];
        $(".component-container").each((i, elem) => {
            const name = $(elem).find(".name").text();
            const status = $(elem).find(".component-status").text();
            datadogArr.push({name: name, status: status, url: siteUrldatadoghq});
        }); 
        return datadogArr;
    } 
    catch (error) {
       console.log(error);  
    }
};

const getResults = async () => {
try { 
    const azureData = await fetchDataFromAzure();
    const doghqData = await fetchDataFromDatadoghq();

    const data = azureData.concat(doghqData);
    console.log(JSON.stringify(data).
    replace(/\\r/g, '\r').
    replace(/\\n/g, ''));

    return {
        data,
    };
} 
catch (error) {
    console.log(error);       
}
};

module.exports = getResults;