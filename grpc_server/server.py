from concurrent import futures
import grpc
import model_pb2
import model_pb2_grpc

class ModelService(model_pb2_grpc.ModelServiceServicer):
    def Detect(self, request, context):
        # 模型预测逻辑，假设返回的结果是每个模型的概率
        probabilities = {
            'model_1': 0.8,
            'model_2': 0.7,
            'model_3': 0.6,
            'model_4': 0.9,
            'model_5': 0.85,
            'model_6': 0.75
        }
        return model_pb2.ModelResponse(probabilities=probabilities)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    model_pb2_grpc.add_ModelServiceServicer_to_server(ModelService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
