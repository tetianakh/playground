from django.shortcuts import render
from django.views.generic import (
    TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
)
from django.urls import reverse_lazy

from . import models


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['content'] = 'What a wonderful day!'
        return context


class SchoolListView(ListView):
    context_object_name = 'schools'
    model = models.School


class SchoolDetailView(DetailView):
    context_object_name = 'school'

    model = models.School
    template_name = 'cbvs/school_details.html'


class SchoolCreateView(CreateView):
    model = models.School
    fields = ('principal', 'location', 'name')


class SchoolUpdateView(UpdateView):
    fields = ('principal', 'name')
    model = models.School

class SchoolDeleteView(DeleteView):
    model = models.School
    success_url = reverse_lazy("cbvs:list")
