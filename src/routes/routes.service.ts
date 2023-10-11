import models from '../db';
import axios from 'axios';

interface createRouteProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

async function getRoutes(data: any) {
  try {
  } catch (error) {}
}

async function getRoute(data: any) {
  try {
  } catch (error) {}
}
async function createRoute(data: createRouteProps) {
  try {
  } catch (error) {}
}
async function updateRoute(data: any) {
  try {
  } catch (error) {}
}
async function deleteRoute(data: any) {
  try {
  } catch (error) {}
}

export const routeService = {
  getRoute,
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
};
