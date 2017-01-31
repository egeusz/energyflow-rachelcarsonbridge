echo "checking git...";
git -C /bridgeproject/git_repo/bridge/ pull;
echo "starting node...";
node /bridgeproject/git_repo/bridge/node_animator/server.js &
