PORT=3003
PID=$(lsof -ti tcp:$PORT)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Killed process on port $PORT"
else
  echo "No process found on port $PORT"
fi