module.exports = {
    ElasticClient: function () {
        var elasticClient;

        function createInstance() {
            var elasticsearch = require('elasticsearch');
            return new elasticsearch.Client({
                host: 'http://ec2-34-248-57-210.eu-west-1.compute.amazonaws.com:9200',
                log: 'trace'
            });
        }

        return {
            getInstance: function () {
                if (!elasticClient) {
                    elasticClient = createInstance();
                }
                if (!elasticClient) {
                    console.log("elasticClient is Null");
                } else {
                    console.log("elasticClient is Setted");
                }
                return elasticClient;
            }
        };
    }
};

 