package main

import (
	"github.com/kabukky/httpscerts"
	"log"
	"net/http"
  "flag"
  "strings"
  "fmt"
)

var port string

func init() {
  flag.StringVar(&port, "port", "1337", "Set the HTTP port")
}

func main() {
  flag.Parse()

  // Check if a port is set
  if port != "" {
    // Check if there is a colon (:) inside
    index := strings.Index(port, ":")
    // If not, prepend one
    if index == -1 {
      // Port needs to be in the format ":1234" so we prepand a ":"
      port = ":" + port
    }
  }

	// Check if the cert files are available.
	err := httpscerts.Check("cert.pem", "key.pem")
	// If they are not available, generate new ones.
	if err != nil {
		err = httpscerts.Generate("cert.pem", "key.pem", fmt.Sprintf("127.0.0.1%s", port))
		if err != nil {
			log.Fatal("Error: Couldn't create https certs.")
		}
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})

	// HTTPS
	log.Fatal(http.ListenAndServeTLS(port, "cert.pem", "key.pem", nil))
}
