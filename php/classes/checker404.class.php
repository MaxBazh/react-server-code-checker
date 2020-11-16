<?php
error_reporting(0);

class Checker404 {
    private $urls = '';
    private $out = [];

    function __construct($urls) {
        if( !$this->urls ){
            $this->urls = $urls;
        }
    }

    public function getAnswer(){
        if( !$this->urls ){
            return false;
        }
        
        $ch = curl_init();

        $this->out = [];

        foreach ($this->urls as $url) {
            $item = [];

            $headers = get_headers($url);

            if ($headers === false) {
                $item = [
                    'url' => $url,
                    'status' => -1,
                    'errors' => 'Сайт не существует'
                ];

                $this->out[] = $item;
                continue;
            }
            
            if (empty($headers[0])) {
                $item = [
                    'url' => $url,
                    'status' => -1,
                    'errors' => 'Headers Empty'
                ];

                $this->out[] = $item;
                continue;
            }

            preg_match('/\d{3}/', $headers[0], $matches);
            $http_code = $matches[0] . PHP_EOL;

            $item = [
                'url' => $url,
                'status' => $http_code
            ];

            $this->out[] = $item;
        }

        curl_close($ch);

        $result = $this->out;

        return $result;
    }
}