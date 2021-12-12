import crypto from "crypto";
import web3Abi from "web3-eth-abi";
import web3Utils from "web3-utils";
import ethUtil from "ethereumjs-util";

export const VERIFIABLE_CREDENTIAL_TYPEHASH = web3Utils.soliditySha3( "VerifiableCredential(address issuer,address subject,bytes32 data,uint256 validFrom,uint256 validTo)" );
export const EIP712DOMAIN_TYPEHASH = web3Utils.soliditySha3( "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)" );

export const CLAIMS_VERIFIER_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_registryAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ISSUER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SIGNER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getRoleMember",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleMemberCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "issuer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "subject",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "data",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "validFrom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "validTo",
						"type": "uint256"
					}
				],
				"internalType": "struct ClaimTypes.VerifiableCredential",
				"name": "vc",
				"type": "tuple"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "verifyCredential",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "issuer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "subject",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "data",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "validFrom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "validTo",
						"type": "uint256"
					}
				],
				"internalType": "struct ClaimTypes.VerifiableCredential",
				"name": "vc",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "verifySigner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_subject",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_credentialHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_from",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_exp",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "registerCredential",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_credentialHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "registerSignature",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export function sha256( data ) {
	const hashFn = crypto.createHash( 'sha256' );
	hashFn.update( data );
	return hashFn.digest( 'hex' );
}

export function getCredentialHash( vc, issuerAddress, claimsVerifierContractAddress ) {
	const hashDiplomaHex = `0x${sha256( JSON.stringify( vc.credentialSubject ) )}`;

	const encodeEIP712Domain = web3Abi.encodeParameters(
		['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
		[EIP712DOMAIN_TYPEHASH, web3Utils.sha3( "EIP712Domain" ), web3Utils.sha3( "1" ), 648529, claimsVerifierContractAddress]
	);
	const hashEIP712Domain = web3Utils.soliditySha3( encodeEIP712Domain );

	const validFrom = new Date( vc.issuanceDate ).getTime();
	const validTo = new Date( vc.expirationDate ).getTime();
	const subjectAddress = vc.credentialSubject.id.split( ':' ).slice( -1 )[0];
	const encodeHashCredential = web3Abi.encodeParameters(
		['bytes32', 'address', 'address', 'bytes32', 'uint256', 'uint256'],
		[VERIFIABLE_CREDENTIAL_TYPEHASH, issuerAddress, subjectAddress, hashDiplomaHex, Math.round( validFrom / 1000 ), Math.round( validTo / 1000 )]
	);
	const hashCredential = web3Utils.soliditySha3( encodeHashCredential );

	const encodedCredentialHash = web3Abi.encodeParameters( ['bytes32', 'bytes32'], [hashEIP712Domain, hashCredential.toString( 16 )] );
	return web3Utils.soliditySha3( '0x1901'.toString( 16 ) + encodedCredentialHash.substring( 2, 131 ) );
}

export function signCredential( credentialHash, issuerPrivateKey ) {
	const rsv = ethUtil.ecsign(
		Buffer.from( credentialHash.substring( 2, 67 ), 'hex' ),
		Buffer.from( issuerPrivateKey, 'hex' )
	);
	return ethUtil.toRpcSig( rsv.v, rsv.r, rsv.s );
}

export function getRSV( signature ){
	return ethUtil.fromRpcSig( signature );
}