export default [
  {
    q: "Which OSI layer is responsible for logical addressing and routing packets between different networks?",
    options: ["Data Link layer (Layer 2)", "Transport layer (Layer 4)", "Network layer (Layer 3)", "Session layer (Layer 5)"],
    answer: 2,
    why: [
      "The Data Link layer handles delivery between nodes on the same local link using MAC addresses, not routing across networks.",
      "The Transport layer provides end-to-end process communication (ports, reliability), not path selection between networks.",
      "The Network layer (IP) provides logical addressing and routers forward packets hop by hop toward the destination network.",
      "The Session layer manages dialogs between applications, such as setting up and tearing down sessions; it does not route."
    ]
  },
  {
    q: "Which statement correctly describes UDP?",
    options: [
      "It is connectionless and does not guarantee delivery or ordering",
      "It establishes a connection with a three-way handshake first",
      "It retransmits lost datagrams automatically",
      "It provides flow control using a sliding window"
    ],
    answer: 0,
    why: [
      "UDP just sends independent datagrams with minimal overhead; there is no connection, acknowledgment, or ordering guarantee.",
      "The three-way handshake belongs to TCP; UDP sends data immediately with no setup.",
      "Retransmission of lost data is a TCP feature; UDP leaves loss recovery to the application if needed.",
      "Sliding-window flow control is part of TCP; UDP has no receive window mechanism."
    ]
  },
  {
    q: "What is the default well-known port for HTTPS?",
    options: ["80", "22", "8443", "443"],
    answer: 3,
    why: [
      "Port 80 is the default for plain, unencrypted HTTP.",
      "Port 22 is used by SSH (and SFTP), not web traffic.",
      "8443 is a common alternative HTTPS port used by some applications, but it is not the default.",
      "HTTPS (HTTP over TLS) uses TCP port 443 by default."
    ]
  },
  {
    q: "What is the correct order of segments in the TCP three-way handshake?",
    options: ["SYN, ACK, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN-ACK, SYN, ACK", "ACK, SYN, SYN-ACK"],
    answer: 1,
    why: [
      "The server cannot send a bare ACK before it has also sent its own SYN; it combines them into a single SYN-ACK.",
      "The client sends SYN, the server answers SYN-ACK (acknowledging and sending its own SYN), and the client finishes with ACK.",
      "The connection is always initiated by the client's SYN, so SYN-ACK cannot come first.",
      "An ACK has nothing to acknowledge at the start; the first segment must be a SYN."
    ]
  },
  {
    q: "What is the primary job of DNS?",
    options: [
      "Assigning IP addresses to hosts automatically",
      "Translating IP addresses into MAC addresses",
      "Translating human-readable domain names into IP addresses",
      "Encrypting traffic between browser and web server"
    ],
    answer: 2,
    why: [
      "Automatic address assignment is DHCP's role, not DNS.",
      "IP-to-MAC translation on a local network is done by ARP.",
      "DNS is a distributed naming system that maps names like example.com to IP addresses.",
      "Encryption is provided by TLS; DNS only resolves names (and is itself unencrypted unless DoT/DoH is used)."
    ]
  },
  {
    q: "What does DHCP provide to a host joining a network?",
    options: [
      "An IP address, subnet mask, default gateway, and DNS server settings",
      "A permanent domain name registered on the internet",
      "A TLS certificate for secure communication",
      "A route to every other network on the internet"
    ],
    answer: 0,
    why: [
      "DHCP leases IP configuration automatically, typically including mask, gateway, and DNS servers.",
      "Domain names are registered through registrars and served by DNS; DHCP does not register them.",
      "Certificates come from certificate authorities and are unrelated to DHCP.",
      "Hosts only receive a default gateway; routing to other networks is handled by routers and their routing protocols."
    ]
  },
  {
    q: "How many layers does the OSI reference model define, and how many does the TCP/IP model usually define?",
    options: ["5 and 4", "7 and 4", "7 and 5", "6 and 4"],
    answer: 1,
    why: [
      "OSI has 7 layers, not 5; 5 is the count of the hybrid teaching model.",
      "OSI has 7 layers (Physical to Application); the classic TCP/IP model has 4 (Link, Internet, Transport, Application).",
      "OSI has 7 layers, but the classic TCP/IP model has 4; 5 is a hybrid textbook variant.",
      "OSI has 7 layers, not 6; the TCP/IP count of 4 is correct but the first number is wrong."
    ]
  },
  {
    q: "What is the protocol data unit (PDU) name at the Data Link layer?",
    options: ["Segment", "Packet", "Bit", "Frame"],
    answer: 3,
    why: [
      "A segment is the Transport layer PDU for TCP (datagram for UDP).",
      "A packet is the Network layer PDU.",
      "Bits are the Physical layer unit sent over the medium.",
      "The Data Link layer encapsulates packets into frames with MAC addresses and a frame check sequence."
    ]
  },
  {
    q: "How many usable host addresses does a /24 IPv4 subnet provide?",
    options: ["256", "255", "254", "252"],
    answer: 2,
    why: [
      "256 is the total address count (2^8), but the network and broadcast addresses are not assignable to hosts.",
      "255 only subtracts one reserved address; both the network and broadcast addresses are reserved.",
      "2^8 = 256 total addresses minus the network address and the broadcast address leaves 254 usable hosts.",
      "252 subtracts four addresses, but only two are reserved in a standard IPv4 subnet (network and broadcast)."
    ]
  },
  {
    q: "What is the dotted-decimal subnet mask for a /26 prefix?",
    options: ["255.255.255.192", "255.255.255.224", "255.255.255.128", "255.255.254.0"],
    answer: 0,
    why: [
      "26 network bits means the last octet has 2 network bits (11000000), which is 192.",
      "255.255.255.224 has 27 network bits, which is a /27, not /26.",
      "255.255.255.128 has 25 network bits, which is a /25.",
      "255.255.254.0 has 23 network bits, which is a /23."
    ]
  },
  {
    q: "A host has the address and prefix shown below. What is the network address of its subnet?",
    code: "Host: 192.168.10.77/26",
    options: ["192.168.10.0", "192.168.10.64", "192.168.10.76", "192.168.10.128"],
    answer: 1,
    why: [
      "192.168.10.0 would be the network only for a /24 or for hosts .0-.63; .77 is outside that /26 block.",
      "A /26 has blocks of 64 addresses (0, 64, 128, 192); 77 falls in the block starting at 64.",
      "Network addresses fall on block boundaries; .76 is not a multiple of 64 and is just another host-range address.",
      "192.168.10.128 starts the next /26 block, which begins above .77."
    ]
  },
  {
    q: "What is the correct order of messages in the DHCP lease process (DORA)?",
    options: [
      "Offer, Discover, Acknowledge, Request",
      "Discover, Request, Offer, Acknowledge",
      "Request, Offer, Discover, Acknowledge",
      "Discover, Offer, Request, Acknowledge"
    ],
    answer: 3,
    why: [
      "The client must broadcast a Discover first; a server cannot make an Offer before it knows a client wants one.",
      "The client sends Request only after receiving an Offer, so Offer comes before Request.",
      "A Request cannot start the exchange; the client first discovers servers and receives offers.",
      "The client broadcasts Discover, a server replies with Offer, the client sends Request for that offer, and the server confirms with Acknowledge."
    ]
  },
  {
    q: "A NAT router has created these translations. Why do the two entries use different public ports?",
    code: "192.168.1.10:5000 -> 203.0.113.5:40001\n192.168.1.11:5000 -> 203.0.113.5:40002",
    options: [
      "Because the two hosts use different protocols",
      "Because private addresses cannot use port 5000 twice on the internet",
      "Because DHCP assigned different ports to each host",
      "Because the router uses distinct public ports to tell apart return traffic for hosts sharing one public IP"
    ],
    answer: 3,
    why: [
      "Both flows use the same source port and are not distinguished by protocol; the difference is purely the translation.",
      "Private addresses are not routed on the internet at all; the issue is disambiguating replies, not a rule against port reuse.",
      "DHCP assigns addresses, not NAT port mappings; the router creates these mappings itself.",
      "With port address translation (PAT), many private hosts share one public IP, and unique public ports let the router map replies back to the right host."
    ]
  },
  {
    q: "Which of the following is a private (RFC 1918) IPv4 address?",
    options: ["172.20.8.9", "172.32.0.1", "192.169.1.1", "11.0.0.1"],
    answer: 0,
    why: [
      "RFC 1918 reserves 172.16.0.0 through 172.31.255.255, and 172.20.8.9 falls inside that range.",
      "172.32.0.1 is just outside the private range, which ends at 172.31.255.255, so it is public.",
      "Only 192.168.0.0/16 is private; 192.169.x.x is a public address.",
      "11.0.0.0/8 is not reserved; the private 10.0.0.0/8 block starts with 10, not 11."
    ]
  },
  {
    q: "A router has the routing table below. To which next hop does it forward a packet destined for 10.1.2.3?",
    code: "10.0.0.0/8    via A\n10.1.0.0/16   via B\n10.1.2.0/24   via C\n0.0.0.0/0     via D",
    options: ["Next hop A", "Next hop B", "Next hop C", "Next hop D"],
    answer: 2,
    why: [
      "10.0.0.0/8 matches, but it is the least specific of the matching prefixes (besides the default).",
      "10.1.0.0/16 matches too, but a longer matching prefix exists.",
      "Routers use longest-prefix match; 10.1.2.0/24 is the most specific route that contains 10.1.2.3.",
      "The default route 0.0.0.0/0 is used only when no more specific route matches."
    ]
  },
  {
    q: "Which DNS record type maps a hostname to an IPv6 address?",
    options: ["A", "AAAA", "CNAME", "MX"],
    answer: 1,
    why: [
      "An A record maps a name to an IPv4 address only.",
      "AAAA records (quad-A) hold IPv6 addresses, which are four times the size of IPv4 addresses.",
      "A CNAME makes one name an alias of another name; it does not hold an address itself.",
      "An MX record identifies the mail servers for a domain, not an IPv6 address."
    ]
  },
  {
    q: "Which TCP mechanism lets a receiver prevent a fast sender from overwhelming its buffers?",
    options: [
      "The advertised receive window",
      "The congestion window (cwnd) alone",
      "The three-way handshake",
      "The TTL field in the IP header"
    ],
    answer: 0,
    why: [
      "The receiver advertises how much buffer space it has (rwnd) in each ACK, and the sender may not have more unacknowledged data than that.",
      "cwnd is maintained by the sender to limit load on the network (congestion control), not to protect the receiver.",
      "The handshake only sets up the connection and initial sequence numbers; it does not regulate ongoing data rate.",
      "TTL limits how many hops an IP packet may traverse to prevent routing loops; it has no role in flow control."
    ]
  },
  {
    q: "What does ARP do on a local Ethernet network?",
    options: [
      "Resolves domain names to IP addresses",
      "Assigns IP addresses to new hosts",
      "Chooses the best route to a remote network",
      "Resolves a known IPv4 address to a MAC address"
    ],
    answer: 3,
    why: [
      "Name resolution is the job of DNS, not ARP.",
      "Address assignment is the job of DHCP; ARP only discovers existing mappings.",
      "Path selection is done by routing protocols and the routing table; ARP works only within a single link.",
      "ARP broadcasts a request asking who owns an IP address, and the owner replies with its MAC address for frame delivery."
    ]
  },
  {
    q: "Which is the broadcast address of the subnet containing the host below?",
    code: "Host: 10.0.1.50/22",
    options: ["10.0.1.255", "10.0.2.255", "10.0.3.255", "10.0.255.255"],
    answer: 2,
    why: [
      "10.0.1.255 would be the broadcast of a /24; a /22 extends beyond the third octet value of 1.",
      "10.0.2.255 is the end of a /23-sized region, but the /22 block covers third-octet values 0 to 3.",
      "A /22 spans four /24s; 10.0.1.50 sits in the block 10.0.0.0 to 10.0.3.255, so the broadcast is 10.0.3.255.",
      "10.0.255.255 would be the broadcast of a /16, which has far more host bits than a /22."
    ]
  },
  {
    q: "In a normal TCP connection close, why does the side that closes first enter TIME_WAIT for about 2*MSL?",
    options: [
      "To free the port number immediately for other applications",
      "To retransmit the final ACK if lost and let delayed segments from the old connection expire",
      "To perform a new three-way handshake before closing",
      "To wait for DNS records of the peer to expire"
    ],
    answer: 1,
    why: [
      "TIME_WAIT does the opposite: it keeps the connection tuple reserved so it is not reused too early.",
      "If the final ACK is lost the peer resends its FIN, which TIME_WAIT can answer, and waiting 2*MSL ensures stray old segments die out.",
      "Closing uses FIN/ACK exchanges; no new handshake is performed during TIME_WAIT.",
      "TCP state handling is independent of DNS; no DNS records are involved in teardown."
    ]
  },
  {
    q: "In classic TCP Reno, what happens to the congestion window when a retransmission timeout occurs?",
    options: [
      "It is halved and the sender enters congestion avoidance",
      "It stays unchanged because the receiver window controls sending",
      "It is doubled to probe for more bandwidth",
      "It is reset to 1 MSS and the sender restarts in slow start"
    ],
    answer: 3,
    why: [
      "Halving cwnd is the response to a triple duplicate ACK (fast recovery), a milder loss signal than a timeout.",
      "cwnd and rwnd both limit sending; a timeout signals serious congestion, so cwnd is reduced.",
      "Doubling is the growth behaviour of slow start when ACKs return, not the reaction to loss.",
      "A timeout indicates severe congestion, so cwnd drops to 1 MSS, ssthresh is set to half the previous window, and slow start begins again."
    ]
  },
  {
    q: "A client opens a connection using an initial sequence number of 100 and the server uses 300. What acknowledgment number does the server's SYN-ACK carry?",
    code: "Client -> Server: SYN     seq=100\nServer -> Client: SYN-ACK seq=300 ack=?",
    options: ["101", "301", "100", "300"],
    answer: 0,
    why: [
      "The ACK number is the next sequence number expected; a SYN consumes one sequence number, so the server acknowledges 100 + 1 = 101.",
      "301 would be the client's later ACK of the server's SYN, not the server's acknowledgment of the client's SYN.",
      "Acknowledging 100 would mean the server expects the same byte again; the SYN already consumed number 100.",
      "300 is the server's own sequence number, not what it expects from the client."
    ]
  },
  {
    q: "During iterative DNS resolution of www.example.com, what does a root name server typically return to the resolver?",
    options: [
      "The final IP address of www.example.com",
      "A referral to the authoritative servers for the .com top-level domain",
      "The MAC address of the destination web server",
      "A DHCP lease for the resolver"
    ],
    answer: 1,
    why: [
      "Root servers do not know individual host records; only the authoritative server for example.com does.",
      "Root servers point the resolver to the TLD servers (.com), which in turn refer it to example.com's authoritative servers.",
      "MAC addresses are link-layer details and are never returned by DNS.",
      "DHCP leases are issued by DHCP servers on the local network, not by DNS root servers."
    ]
  },
  {
    q: "Which single CIDR block exactly aggregates the four networks 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, and 192.168.3.0/24?",
    options: ["192.168.0.0/23", "192.168.0.0/21", "192.168.0.0/22", "192.168.0.0/16"],
    answer: 2,
    why: [
      "A /23 covers only two /24 networks (192.168.0.0 to 192.168.1.255), which is half of what is needed.",
      "A /21 covers eight /24 networks, which would include 192.168.4.0 to 192.168.7.0 that are not part of the set.",
      "Four /24s need two extra host bits, so 24 - 2 = /22, which spans 192.168.0.0 to 192.168.3.255 exactly.",
      "A /16 covers 256 /24 networks, far more than the four listed, so it is not an exact aggregate."
    ]
  },
  {
    q: "A web server listens on TCP port 80 and serves thousands of clients at once. Which set of values uniquely identifies each TCP connection?",
    options: [
      "Source IP, source port, destination IP, destination port",
      "Only the server's IP address and port 80",
      "Only the client's MAC address",
      "Only the client's IP address"
    ],
    answer: 0,
    why: [
      "A TCP connection is identified by the 4-tuple (with TCP as the protocol), so many clients can share server port 80 because their source IP or port differs.",
      "All clients share the same server IP and port, so these cannot tell connections apart.",
      "MAC addresses are link-layer and change at each hop, so they cannot identify an end-to-end connection.",
      "One client can open many connections with different source ports, so its IP alone is not unique."
    ]
  }
]
