# ManiPlace E-commerce Platform

ManiPlace is an innovative e-commerce platform aimed at connecting Moroccan businesses with local and international buyers. Our goal is to facilitate access for global sellers to Moroccan commercial buyers, enabling seamless transactions and fostering trade relationships.

## Features

- User registration and authentication
- Product listing and search functionality
- Shopping cart and checkout process
- Payment processing integration
- Seller dashboard for managing products and orders

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Other dependencies (list any additional technologies or libraries used)

## Getting Started

To get started with ManiPlace, follow these steps:
1. Clone this repository to your local machine.
2. Install dependencies using npm or yarn.
3. Set up environment variables (if applicable).
4. Run the development server.

## Contact

For more information, please contact us at info@maniplace.com or visit our website: [maniplace.com](https://www.maniplace.com)

----------------------------------------------------------------------------


## GitHub Workflow Guidelines / Integration with Jira

To ensure smooth integration between GitHub and Jira, please follow these guidelines when working on the project:

- **Branch Names:** Include the Jira issue key in the branch name using the following format: `feature/MAN-2-add-new-feature`.
- **Pull Request Titles:** Prepend the Jira issue key to the pull request title, e.g., `[MAN-2] Add new feature`.
- **Commit Messages:** Begin each commit message with the Jira issue key followed by a colon, e.g., `MAN-2: Implement feature XYZ`.

### Examples:

- Branch Name: `feature/MAN-2-add-new-feature`
- Pull Request Title: `[MAN-2] Add new feature`
- Commit Message: `MAN-2: Implement feature XYZ`

Please adhere to these guidelines to ensure accurate tracking of development work in Jira.

----------------------------------------------------------------------


## Branching Structure Guide

This repository follows a branching structure designed to facilitate collaboration and code management for our team of three working on the project. Below is an overview of the branches and their purposes:

### Master Branch:
- **Purpose:** The main branch containing stable and deployable production code.
- **Deployment:** Deployments to production environments are made from this branch.

### Develop Branch:
- **Purpose:** Common development branch where ongoing feature development is merged for continuous integration.
- **Testing:** Integration and validation tests are performed from this branch.

### Feature Branches:
- **Naming Convention:** `feature/feature-name`
- **Purpose:** Individual branches created by team members from `develop` for working on specific features.
- **Example:** `feature/login-page` for developing a login page feature.
- **Integration:** Once a feature is complete and tested, it is merged into `develop` for integration.

### Bugfix Branches:
- **Naming Convention:** `bugfix/issue-name`
- **Purpose:** Branches created by team members from `develop` for fixing bugs.
- **Example:** `bugfix/user-authentication` for fixing a user authentication issue.
- **Integration:** After fixing the bug and testing, the bugfix branch is merged into `develop` for integration.

### Release Branches (Optional):
- **Naming Convention:** `release/version`
- **Purpose:** Optional branches created from `develop` to prepare a specific version for deployment.
- **Testing:** Final testing and adjustments are made in this branch before merging into `master` for production deployment.

This branching structure aims to ensure efficient management of features, bug fixes, and versions while maintaining a stable main branch for deployment. Clear policies on branch creation, merging, and cleanup help maintain order and consistency in the Git repository.

---

