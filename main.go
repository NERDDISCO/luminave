package main

import (
	"github.com/kabukky/httpscerts"
	"log"
	"net/http"
)

func main() {

	// Check if the cert files are available.
	err := httpscerts.Check("cert.pem", "key.pem")
	// If they are not available, generate new ones.
	if err != nil {
		err = httpscerts.Generate("cert.pem", "key.pem", "127.0.0.1:8081")
		if err != nil {
			log.Fatal("Error: Couldn't create https certs.")
		}
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})

	// HTTP
	//log.Fatal(http.ListenAndServe(":8081", nil))

	// HTTPS
	log.Fatal(http.ListenAndServeTLS(":8081", "cert.pem", "key.pem", nil))
}
