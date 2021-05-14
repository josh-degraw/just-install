# `just-install`

Useful for when you work in different projects that require using either `npm` or `yarn` exclusively, and don't want to have to remember which one when you just want to load up the dependencies in that project.

Detects if there is a `yarn.lock` file in the working directory, and if so, installs using yarn.

## Usage

Install globally via 
```sh
npm i --global just-install
# or
yarn global add just-install
```

Then just run 

```sh
just-install
```

Or you can just do 

```sh
npx just-install
```

You can also pass arguments to the function e.g. 

```sh
just-install -D typescript babel
```

 should install `typescript` and `babel` to your dev-dependencies, using the correct package manager.

