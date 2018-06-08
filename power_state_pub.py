import paho.mqtt.client as mqtt

host = 'siro.nov'
port = 1883
topic = 'power'

client = mqtt.Client(protocol=mqtt.MQTTv311)
client.connect(host, port=port, keepalive=60)
client.publish(topic, 'tv')

client.disconnect()
