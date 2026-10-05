export default [
  {
    q: "What defines symmetric encryption, as opposed to asymmetric encryption?",
    options: [
      "It uses a public key to encrypt and a private key to decrypt",
      "It never needs any secret value to be shared between the parties",
      "The same secret key is used for both encryption and decryption",
      "It produces a fixed-length output regardless of the input size"
    ],
    answer: 2,
    why: [
      "That describes asymmetric (public-key) encryption, where the two keys differ.",
      "Symmetric schemes require both parties to already hold the same secret, which is the key distribution problem.",
      "Correct: one shared secret key performs both operations, which makes symmetric ciphers like AES fast but forces a secure way to share the key.",
      "A fixed-length output is a property of hash functions, not of encryption, whose ciphertext length tracks the plaintext length."
    ]
  },
  {
    q: "Why should a website store password hashes instead of encrypted passwords?",
    options: [
      "A hash is one-way, so a database leak does not directly reveal the passwords",
      "Hashes can be reversed quickly by the server whenever a user forgets a password",
      "Hashing makes the stored data smaller, which is the main security benefit",
      "Encrypted passwords cannot be compared with what the user types at login"
    ],
    answer: 0,
    why: [
      "Correct: a hash cannot feasibly be inverted, so the server only verifies by hashing the login attempt and comparing, and a leak does not expose the plaintext.",
      "A good hash is deliberately not reversible; forgotten passwords are handled by a reset, not by recovering the original.",
      "Size is incidental; the security benefit is one-wayness, not compactness.",
      "Encrypted passwords can be decrypted and compared; the problem is that anyone with the key (or a breach of it) gets every password."
    ]
  },
  {
    q: "Which statement correctly distinguishes authentication from authorization?",
    options: [
      "Authentication decides what a user may do; authorization proves who they are",
      "Authentication verifies who you are; authorization decides what you may access",
      "They are two names for the same step performed by the login form",
      "Authentication applies only to servers and authorization only to human users"
    ],
    answer: 1,
    why: [
      "This reverses the two terms; authorization is the permission decision.",
      "Correct: authentication establishes identity (password, token, certificate), then authorization checks that identity against permissions for a resource.",
      "They are separate steps; a logged-in user can still be denied access to a resource.",
      "Both concepts apply to users, services, and devices alike; neither is restricted to one kind of principal."
    ]
  },
  {
    q: "What is the root cause of the vulnerability in this code?",
    code: "const sql = \"SELECT * FROM users WHERE name = '\" + name + \"'\";\ndb.query(sql);",
    options: [
      "The database connection is not encrypted with a password",
      "The query uses SELECT * instead of listing the needed columns",
      "The table name users is visible to anyone reading the source",
      "Untrusted input is concatenated into the query, so it can change the SQL structure"
    ],
    answer: 3,
    why: [
      "Connection security matters but is unrelated to injection; this flaw exists even over a perfectly secure connection.",
      "SELECT * is a style and efficiency concern, not what lets an attacker alter the query.",
      "Keeping table names secret is security through obscurity and does not prevent injection.",
      "Correct: the user's value becomes part of the SQL text, so quotes and keywords in it are parsed as code (SQL injection) rather than treated as data."
    ]
  },
  {
    q: "What is cross-site scripting (XSS)?",
    options: [
      "An attacker guessing a user's password by trying many combinations",
      "An attacker forcing a logged-in browser to send an unwanted request to a site",
      "An attacker getting a site to deliver malicious script that runs in other users' browsers",
      "An attacker intercepting traffic between the browser and the server on a network"
    ],
    answer: 2,
    why: [
      "That is a brute-force or credential-guessing attack, not XSS.",
      "That describes CSRF, which abuses the browser's automatic credentials rather than injecting script.",
      "Correct: XSS injects script into a page the victim trusts, so it runs with that site's origin and can steal cookies or act as the user.",
      "That is a network eavesdropping or man-in-the-middle attack, which TLS addresses; XSS needs no network position."
    ]
  },
  {
    q: "What does the principle of least privilege require?",
    options: [
      "Each user and process gets only the permissions needed for its task",
      "Every user starts with full access and loses it only when they misuse it",
      "Administrators should share a single account to reduce the number of credentials",
      "Permissions should be granted permanently so that access never has to be re-requested"
    ],
    answer: 0,
    why: [
      "Correct: limiting permissions to the minimum needed shrinks the damage from a bug, compromised account, or insider mistake.",
      "Start-with-everything is the opposite; least privilege defaults to no access and adds only what is required.",
      "Shared admin accounts destroy accountability and expand the attack surface rather than reducing risk.",
      "Permanent grants lead to privilege creep; least privilege favors narrow, time-limited access that is reviewed."
    ]
  },
  {
    q: "Which three guarantees does TLS provide for a connection?",
    options: [
      "Anonymity, load balancing, and compression of all traffic",
      "Confidentiality, integrity, and authentication of the server",
      "Availability, non-repudiation, and protection from malware",
      "Authorization, input validation, and protection from SQL injection"
    ],
    answer: 1,
    why: [
      "TLS does not provide anonymity or load balancing, and compression is not a security guarantee (it has even enabled attacks).",
      "Correct: TLS encrypts data (confidentiality), detects tampering (integrity), and uses certificates to authenticate the server.",
      "TLS cannot guarantee availability or stop malware, and it does not give non-repudiation of messages.",
      "Authorization and input validation are application-layer concerns; TLS does not stop SQL injection."
    ]
  },
  {
    q: "In a digital signature scheme, which key does the signer use to create the signature?",
    options: [
      "The recipient's public key",
      "The recipient's private key",
      "The signer's public key",
      "The signer's private key"
    ],
    answer: 3,
    why: [
      "The recipient's public key encrypts data for the recipient; it plays no part in proving who signed.",
      "The signer never has the recipient's private key, and that key is meant to stay secret.",
      "The public key is shared widely and used to verify; if it could sign, anyone could forge signatures.",
      "Correct: only the holder of the private key can produce the signature, and anyone can verify it with the matching public key."
    ]
  },
  {
    q: "What is the main purpose of adding a unique random salt to each password before hashing?",
    options: [
      "To make the hash computation faster for legitimate logins",
      "To make identical passwords hash differently and defeat precomputed rainbow tables",
      "To let the server decrypt the password if the user forgets it",
      "To keep the hashed password secret from anyone with database access"
    ],
    answer: 1,
    why: [
      "A salt adds a little input but does not speed anything up; slowness is handled by the algorithm's cost factor.",
      "Correct: a per-user salt means two users with the same password get different hashes, so precomputed tables and bulk cracking no longer work.",
      "Hashing stays one-way with or without a salt; nothing can be decrypted.",
      "The salt is stored next to the hash and is not secret; its job is uniqueness, not secrecy."
    ]
  },
  {
    q: "Which measure is a standard defense against CSRF (cross-site request forgery)?",
    options: [
      "Encrypting the session cookie value with a strong cipher",
      "Requiring passwords to be at least twelve characters long",
      "Requiring an unpredictable per-session token on state-changing requests",
      "Switching the site from HTTP to HTTPS and nothing else"
    ],
    answer: 2,
    why: [
      "The browser attaches the cookie automatically, so even an encrypted cookie is sent with the forged request.",
      "Password strength does not matter because the attacker rides the victim's existing logged-in session.",
      "Correct: an anti-CSRF token (or SameSite cookies) is something a cross-site attacker cannot read or supply, so forged requests are rejected.",
      "HTTPS protects the transport, but the victim's browser still sends authenticated forged requests over HTTPS."
    ]
  },
  {
    q: "A server issues a standard signed JWT (JWS) whose payload contains the user's role. What is true about the payload?",
    options: [
      "Anyone holding the token can read it, since it is only Base64URL-encoded and signed",
      "It is encrypted, so only the server can read the claims inside the token",
      "It cannot be modified by the client because Base64URL prevents editing",
      "It is hidden from the client because the signature covers the secret key"
    ],
    answer: 0,
    why: [
      "Correct: a signed JWT provides integrity, not secrecy; the payload is just encoded, so never put sensitive data in it unless using JWE.",
      "A plain JWS is not encrypted; encryption would require the separate JWE format.",
      "Encoding does not prevent editing; it is the signature check that makes a modified token detectable.",
      "The signature is computed with the key but does not conceal the payload or the key."
    ]
  },
  {
    q: "What problem is OAuth 2.0 designed to solve?",
    options: [
      "Encrypting data at rest inside the application's database",
      "Storing user passwords securely using salted hashes",
      "Preventing SQL injection through parameterized queries",
      "Letting an app access a user's resources on another service without receiving their password"
    ],
    answer: 3,
    why: [
      "OAuth is not about storage encryption; it governs how access is delegated.",
      "Password hashing is a separate concern, and OAuth's point is that the third-party app never sees the password at all.",
      "Injection defense is about query construction and has nothing to do with OAuth.",
      "Correct: OAuth is a delegated authorization framework where the user grants limited, revocable access tokens to a client app."
    ]
  },
  {
    q: "How are asymmetric and symmetric cryptography typically combined in a TLS handshake?",
    options: [
      "Symmetric keys exchange the certificate, then asymmetric keys encrypt all page data",
      "Only asymmetric encryption is used for the whole session to maximize security",
      "Asymmetric methods authenticate and establish a shared key, then symmetric encryption protects the data",
      "Only symmetric encryption is used, with the key printed in the certificate"
    ],
    answer: 2,
    why: [
      "This reverses the roles; the slow asymmetric operations are limited to setup, not bulk data.",
      "Asymmetric encryption is far too slow for streaming data, so it is not used for the whole session.",
      "Correct: public-key operations authenticate the server and agree on a session key, then fast symmetric ciphers (e.g. AES-GCM) encrypt the traffic.",
      "Certificates contain public keys, not a secret symmetric key; publishing a secret would break confidentiality."
    ]
  },
  {
    q: "Which change correctly fixes the SQL injection in this code?",
    code: "// vulnerable\ndb.query(\"SELECT * FROM users WHERE name = '\" + name + \"'\");\n\n// candidate fixes are in the options",
    options: [
      "Convert the input to uppercase before building the string",
      "db.query(\"SELECT * FROM users WHERE name = ?\", [name])",
      "Truncate the input to at most 100 characters",
      "Remove all space characters from the input"
    ],
    answer: 1,
    why: [
      "Changing case does nothing to quotes or SQL syntax in the input, and SQL keywords are case-insensitive anyway.",
      "Correct: a parameterized query sends the SQL and the value separately, so the value is always treated as data and cannot change the query.",
      "A length limit still allows short payloads such as ' OR 1=1 --.",
      "Removing spaces is an easily bypassed blacklist (comments like /**/ or tabs can replace spaces)."
    ]
  },
  {
    q: "What is the most reliable fix for the stored-XSS flaw in this code?",
    code: "// comment comes from the database and was written by another user\nel.innerHTML = \"Hello, \" + comment;",
    options: [
      "Use el.textContent so the value is treated as text rather than HTML",
      "Strip the substring \"<script>\" from the comment before inserting it",
      "Limit each comment to 200 characters when it is saved",
      "Serve the page over HTTPS so the comment cannot be altered"
    ],
    answer: 0,
    why: [
      "Correct: textContent (or proper output encoding for the context) makes the browser display markup as characters instead of parsing it, which is the robust fix.",
      "Blacklist stripping is bypassed easily, for example with an img tag using onerror or different casing.",
      "A short payload like <img src=x onerror=alert(1)> fits well within a length limit.",
      "HTTPS protects data in transit, but the malicious comment is already stored and served as legitimate content."
    ]
  },
  {
    q: "Why is a general-purpose hash like SHA-256 a poor choice on its own for storing passwords, compared with bcrypt or Argon2?",
    options: [
      "SHA-256 outputs are too long to fit in a database column",
      "SHA-256 is a symmetric cipher and can be decrypted with the right key",
      "SHA-256 has been proven to produce collisions for most inputs",
      "SHA-256 is very fast, so attackers can test billions of guesses; bcrypt and Argon2 are deliberately slow"
    ],
    answer: 3,
    why: [
      "Length is not an issue; 256 bits fits easily and is not the security concern.",
      "SHA-256 is a hash function, not a cipher, and has no decryption key.",
      "No practical SHA-256 collisions are known; the weakness for passwords is speed, not collisions.",
      "Correct: password hashing needs a tunable work factor (and memory hardness in Argon2) to make brute force expensive, which a fast hash does not give."
    ]
  },
  {
    q: "What does setting the HttpOnly flag on a session cookie accomplish?",
    options: [
      "It forces the cookie to be sent only over HTTPS connections",
      "It stops JavaScript from reading the cookie, limiting theft via XSS",
      "It stops the browser from sending the cookie on cross-site requests",
      "It encrypts the cookie value so that only the server can read it"
    ],
    answer: 1,
    why: [
      "That is the Secure flag, not HttpOnly.",
      "Correct: HttpOnly hides the cookie from document.cookie, so an XSS payload cannot directly exfiltrate the session ID (it can still act as the user, though).",
      "That is the SameSite attribute, which is a CSRF mitigation.",
      "HttpOnly does not encrypt anything; the cookie value is still sent in clear to the server."
    ]
  },
  {
    q: "A message is signed with a valid digital signature and sent unencrypted. Which property does the signature NOT provide?",
    options: [
      "Integrity: the message was not altered after signing",
      "Authenticity: the message came from the holder of the private key",
      "Confidentiality: nobody else can read the message contents",
      "Non-repudiation: the signer cannot plausibly deny having signed it"
    ],
    answer: 2,
    why: [
      "Integrity is provided; any change to the message makes verification fail.",
      "Authenticity is provided, since only the private-key holder could create a signature that verifies.",
      "Correct: a signature only proves origin and integrity; the message itself is still readable unless it is separately encrypted.",
      "Non-repudiation is provided because only the signer's private key could produce the signature."
    ]
  },
  {
    q: "Why is ECB mode considered insecure for encrypting structured data such as images?",
    options: [
      "Identical plaintext blocks encrypt to identical ciphertext blocks, leaking patterns",
      "It requires the key to be transmitted in plain text with every block",
      "It reduces the effective AES key size from 256 bits to 56 bits",
      "It can only encrypt messages shorter than a single block"
    ],
    answer: 0,
    why: [
      "Correct: ECB encrypts every block independently with the same key, so repeated blocks are visible and the outline of an image survives encryption.",
      "ECB does not transmit the key; the flaw is in how blocks are chained, not in key handling.",
      "ECB does not change the key size; the full AES key is still used.",
      "ECB handles multi-block messages fine; that is exactly why its block-by-block behavior leaks structure."
    ]
  },
  {
    q: "A JWT library verifies tokens using whatever algorithm the token header names. What attack does this allow?",
    options: [
      "A replay of the token only if the user has not logged out yet",
      "A brute-force attack against the database password column",
      "A cross-site request that reuses the victim's browser cookie",
      "Forging tokens by setting alg to none, or by tricking RSA verification into using HMAC with the public key"
    ],
    answer: 3,
    why: [
      "Replay is a separate issue (mitigated with expiry and nonces); it is not what trusting the header's alg enables.",
      "This concerns token verification and has no direct link to database password columns.",
      "That is CSRF, which concerns cookies rather than the token's algorithm header.",
      "Correct: trusting the attacker-controlled alg header lets forged tokens pass; servers must enforce an expected algorithm and key type."
    ]
  },
  {
    q: "What is wrong with computing an authentication tag this way, and what is the standard fix?",
    code: "tag = SHA256(secret + message)\n// attacker knows message and tag, not secret",
    options: [
      "Nothing is wrong; prepending a secret makes SHA-256 a secure MAC",
      "Length-extension attacks let an attacker append data and compute a valid tag; use HMAC",
      "SHA-256 outputs are too short to authenticate; use MD5 instead",
      "The secret must be placed after the message, which fully fixes the problem"
    ],
    answer: 1,
    why: [
      "Plain hash(secret || message) is not a safe MAC for Merkle-Damgard hashes like SHA-256.",
      "Correct: the tag reveals the hash's internal state, so an attacker can extend the message and compute a valid new tag without the secret; HMAC's nested construction avoids this.",
      "MD5 is weaker and broken for collisions; output length is not the issue here.",
      "Putting the secret last (hash(message || secret)) has other weaknesses, and standard practice is HMAC rather than ad hoc ordering."
    ]
  },
  {
    q: "What does perfect forward secrecy (PFS) guarantee in a TLS connection?",
    options: [
      "Stolen long-term server keys cannot decrypt previously recorded sessions",
      "The server certificate can never be forged by any attacker",
      "All sessions use the same strong symmetric key to keep things consistent",
      "Messages are guaranteed to arrive in order without any loss"
    ],
    answer: 0,
    why: [
      "Correct: with ephemeral Diffie-Hellman key exchange, each session key is derived from temporary values that are discarded, so a later key compromise cannot unlock past traffic.",
      "Certificate forgery resistance comes from the CA and signature system, not PFS.",
      "PFS is the opposite: each session gets a fresh key, so no single key exposes many sessions.",
      "In-order delivery is a transport property of TCP, unrelated to forward secrecy."
    ]
  },
  {
    q: "Why can this token comparison be dangerous when comparing a secret token against user input?",
    code: "function check(a, b) {\n  if (a.length !== b.length) return false;\n  for (let i = 0; i < a.length; i++) {\n    if (a[i] !== b[i]) return false;\n  }\n  return true;\n}",
    options: [
      "It returns early at the first mismatch, so response time can reveal how many leading characters are correct",
      "It uses a for loop, which always leaks the secret through memory usage",
      "It compares lengths, which makes it impossible to ever match a token",
      "It is vulnerable to SQL injection because it indexes strings with brackets"
    ],
    answer: 0,
    why: [
      "Correct: the early exit creates a timing side channel; attackers can guess one character at a time, so secrets should be compared with a constant-time function.",
      "Loops themselves are not a leak; the data-dependent early return is what leaks timing.",
      "Comparing lengths first is valid and does not prevent matching; it is not the flaw (though it leaks length).",
      "String indexing has nothing to do with SQL; no database is involved in this code."
    ]
  },
  {
    q: "By the birthday bound, roughly how much work is needed to find a collision in an ideal n-bit hash function?",
    options: [
      "About n operations",
      "About 2^n operations, the same as brute-forcing a preimage",
      "About n^2 operations",
      "About 2^(n/2) operations"
    ],
    answer: 3,
    why: [
      "Work grows exponentially in n, so a linear count is far too small.",
      "2^n is roughly the cost of finding a preimage; collisions are much cheaper because any matching pair counts.",
      "A polynomial count would make every hash trivially breakable, which is not the case for secure hashes.",
      "Correct: the birthday paradox means a collision is expected after about 2^(n/2) hashes, which is why a 128-bit hash gives only about 64 bits of collision security."
    ]
  },
  {
    q: "What attack does PKCE (Proof Key for Code Exchange) add protection against in the OAuth authorization code flow?",
    options: [
      "A user choosing a weak password at the identity provider",
      "An attacker stealing an intercepted authorization code and redeeming it for tokens",
      "SQL injection in the authorization server's login form",
      "An expired TLS certificate on the resource server"
    ],
    answer: 1,
    why: [
      "PKCE does not influence password strength; that is handled by the identity provider's policies.",
      "Correct: the client sends a hashed code challenge up front and the matching code verifier later, so an intercepted authorization code is useless to anyone who lacks the verifier.",
      "Injection defenses are about query handling and are not what PKCE addresses.",
      "Certificate validity is part of TLS and is unrelated to the code-exchange binding that PKCE provides."
    ]
  }
]
