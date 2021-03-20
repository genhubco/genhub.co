if [[ $(cargo --version) ]]; then
    echo "Found cargo"
else
    curl https://sh.rustup.rs -sSf | sh -s -- -y
    source $HOME/.cargo/env
    export PATH=$HOME/.cargo/bin:$PATH
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
wasm-pack build --target web --out-name wasm --out-dir "$DIR/../static/out"
