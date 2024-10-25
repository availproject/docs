use avail_rust::{Key, Keypair, SecretUri, WaitFor, SDK, Nonce, Options, Data};
use core::str::FromStr;

#[tokio::main]
async fn main() -> Result<(), String> {
	// Start of main function
	// Main Content
	let sdk = SDK::new("ws://127.0.0.1:9944").await.unwrap();
	println!("Genesis Hash: {:?}", sdk.api.genesis_hash());

	// Account Creation
	let secret_uri = SecretUri::from_str("//Alice").unwrap();
	let account = Keypair::from_uri(&secret_uri).unwrap();
    println!("The address of Alice is: {}", account.public_key().to_account_id().to_string());

	// Application Key Creation
	let key = String::from("My Personal Application Key").as_bytes().to_vec();
	let key = Key { 0: key };
    let options = Options::new().nonce(Nonce::BestBlockAndTxPool);

	let result = sdk.tx.data_availability.create_application_key(key, WaitFor::BlockInclusion, &account, Some(options)).await?;
    println!("Application key ID: {}", result.event.id.0);
	
	// Data Submission
	let data = String::from("My Data").as_bytes().to_vec();
	let data = Data { 0: data };
	let options = Options::new().nonce(Nonce::BestBlockAndTxPool).app_id(result.event.id.0);

	let result = sdk.tx.data_availability.submit_data(data, WaitFor::BlockInclusion, &account, Some(options)).await?;
	println!("Data Submission Hash: {:?}", result.event.data_hash);

	// Balance Transfer
	let bob_address = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty";
	let one_avail = 1_000_000_000_000_000_000u128;
	let options = Options::new().nonce(Nonce::BestBlockAndTxPool);

	let result = sdk.tx.balances.transfer_keep_alive(bob_address, one_avail, WaitFor::BlockInclusion, &account, Some(options)).await?;
	println!("Transfer completed. Alice transferred to Bob {:?} units", result.event.amount);

	Ok(())
}
