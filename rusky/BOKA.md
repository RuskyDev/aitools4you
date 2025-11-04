          {/* Our Clients Section */}
          {/* <div className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Our Clients
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Trusted by industry leaders and innovative companies worldwide
            </p>

            <div
              ref={clientsCarouselRef}
              className="flex gap-4 overflow-x-hidden whitespace-nowrap py-8 px-2"
            >
              {clientLogos.map((client) => (
                <div
                  key={client.id}
                  className="inline-flex items-center justify-center min-w-[160px] h-40 p-2 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}

              {clientLogos.map((client) => (
                <div
                  key={`${client.id}-duplicate`}
                  className="inline-flex items-center justify-center min-w-[160px] h-40 p-2 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div> */}
          
  const clientLogos = [
    { id: 1, name: "Client 1", logoUrl: "logo.png" },
    { id: 2, name: "Client 2", logoUrl: "logo.png" },
    { id: 3, name: "Client 3", logoUrl: "logo.png" },
    { id: 4, name: "Client 4", logoUrl: "logo.png" },
    { id: 5, name: "Client 5", logoUrl: "logo.png" },
  ];