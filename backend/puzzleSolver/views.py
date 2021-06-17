from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . sliding_ai import sliding_puzzle_solver

class solver(APIView):

	def get(self, request):
		pass
    
	def post(self, request):
		inputs = request.data
		arguments = []
		for i in inputs:
			arguments.append(inputs[i])
		moves = sliding_puzzle_solver(arguments[0], arguments[1], arguments[2])
		return Response(moves)