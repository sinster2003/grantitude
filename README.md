# GitHub Bounty Dispenser - Grantitude

## **Problem Statement**
Open source projects thrive on the contributions of developers from around the world. However, recognizing and rewarding these contributions can be challenging. Traditional methods of distributing bounties are often cumbersome, involve intermediaries, and lack transparency. There is a need for a seamless, manual yet transparent way to distribute bounties to open source contributors on GitHub.

## **Idea/Solution**
The GitHub Bounty Dispenser aims to solve this problem by leveraging the power of blockchain technology. Our solution is a decentralized application (dApp) that allows repository owners to manually set bounties for contributions. When a pull request (PR) is approved, the repository owner can allocate a bounty, and the contributor receives the bounty in Ethereum (ETH).

## **Key Features:**
- Manual Bounty Allocation: Repository owners review contributions and manually set bounties for approved pull requests.
- Transparency and Trust: Utilize smart contracts to ensure transparency and trust in the bounty distribution process.
- Decentralization: Eliminate intermediaries, ensuring that contributors are rewarded directly and fairly.
- User-Friendly Interface: Provide an intuitive interface for project maintainers to set bounties and for contributors to receive bounties.

## **Tech Stack**
Our solution is built using the following technologies:

- Solidity: For writing smart contracts that handle the manual distribution of bounties.
- Ethereum Blockchain: To ensure transparency, security, and decentralization of the bounty distribution process.
- Ethers.js: A library for interacting with the Ethereum blockchain from our frontend application.
- React.js: For building a responsive and interactive user interface.
- Aceternity UI: For styling the frontend application and ensuring a great user experience.
- GitHub API: To interact with GitHub repositories, pull requests, and user data.
- Express.js: For building a robust backend server to handle API requests and business logic.

## **Usage**
Once the application is up and running, you can use the following features:

- Project Maintainers: Review pull requests and set bounties for approved contributions.
- Contributors: Submit pull requests. Bounties are awarded at the discretion of the repository owner after a pull request is approved.
