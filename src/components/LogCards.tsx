"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Dumbbell, Hash, Weight, BarChart3, ChevronDown, ChevronUp } from "lucide-react";

export type WorkoutLog = {
  logId: string;
  exerciseId: string;
  userId: string;
  weight: number | null;
  sets: number;
  reps: string;
  date: Date;
};

export type Exercise = {
  exerciseId: string;
  exerciseName: string;
  planId: string;
  reps: string | null;
  workDay: number;
  sets: number | null;
};

interface workoutLogs {
  workOutLogs: WorkoutLog;
  workoutExercises: Exercise;
}

const LogCards = ({ res }: { res: workoutLogs[] }) => {
  const [viewMode, setViewMode] = useState<'date' | 'exercise'>('date');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const dataByDate = useMemo(() => {
    const grouped = res.reduce((acc, curr) => {
      const dateKey = new Date(curr.workOutLogs.date).toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = {};
      }
      const exerciseId = curr.workoutExercises.exerciseId;
      if (!acc[dateKey][exerciseId]) {
        acc[dateKey][exerciseId] = [];
      }
      acc[dateKey][exerciseId].push(curr);
      return acc;
    }, {} as Record<string, Record<string, workoutLogs[]>>);
    
    return Object.entries(grouped).map(([date, exercises]) => ({
      date,
      exercises: Object.entries(exercises).map(([exerciseId, logs]) => ({
        exerciseId,
        logs
      }))
    }));
  }, [res]);
  const dataByExercise = useMemo(() => {
    const grouped = res.reduce((acc, curr) => {
      const exerciseId = curr.workoutExercises.exerciseId;
      if (!acc[exerciseId]) {
        acc[exerciseId] = [];
      }
      acc[exerciseId].push(curr);
      return acc;
    }, {} as Record<string, workoutLogs[]>);

    return Object.entries(grouped).map(([exerciseId, logs]) => ({
      exerciseId,
      exerciseName: logs[0]?.workoutExercises.exerciseName || 'Unknown Exercise',
      logs: logs.sort((a, b) => 
        new Date(b.workOutLogs.date).getTime() - new Date(a.workOutLogs.date).getTime()
      )
    }));
  }, [res]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTotalVolume = (logs: workoutLogs[]) => {
    return logs.reduce((total, log) => {
      const weight = log.workOutLogs.weight || 0;
      const reps = parseInt(log.workOutLogs.reps) || 0;
      return total + (weight * reps);
    }, 0);
  };

  const calculateTotalSets = (logs: workoutLogs[]) => {
    return logs.length;
  };

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-8">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setViewMode('date')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
              viewMode === 'date'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            By Date
          </button>
          <button
            onClick={() => setViewMode('exercise')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
              viewMode === 'exercise'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            By Exercise
          </button>
        </div>
      </div>
      {viewMode === 'date' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dataByDate.map((dateGroup) => {
            const cardId = `date-${dateGroup.date}`;
            const isExpanded = expandedCards.has(cardId);
            const totalExercises = dateGroup.exercises.length;
            const totalSets = dateGroup.exercises.reduce((sum, ex) => sum + ex.logs.length, 0);
            
            return (
              <Card key={dateGroup.date} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {formatDate(dateGroup.date)}
                      </CardTitle>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Dumbbell className="w-3 h-3" />
                          {totalExercises} exercises
                        </span>
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          {totalSets} sets
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCard(cardId)}
                      className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`space-y-3 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
                    {dateGroup.exercises.map((exercise) => (
                      <div key={exercise.exerciseId} className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-sm mb-2 text-gray-900">
                          {exercise.logs[0]?.workoutExercises.exerciseName || 'Unknown Exercise'}
                        </h4>
                        <div className="space-y-1">
                          {exercise.logs.map((log, idx) => (
                            <div key={log.workOutLogs.logId} className="flex justify-between text-xs text-gray-600">
                              <span>Set {idx + 1}</span>
                              <span className="flex items-center gap-2">
                                {log.workOutLogs.weight && (
                                  <span className="flex items-center gap-1">
                                    <Weight className="w-3 h-3" />
                                    {log.workOutLogs.weight} lbs
                                  </span>
                                )}
                                <span>{log.workOutLogs.reps} reps</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!isExpanded && dateGroup.exercises.length > 2 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Click to see all exercises
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {viewMode === 'exercise' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dataByExercise.map((exerciseGroup) => {
            const cardId = `exercise-${exerciseGroup.exerciseId}`;
            const isExpanded = expandedCards.has(cardId);
            const totalVolume = calculateTotalVolume(exerciseGroup.logs);
            const totalSets = calculateTotalSets(exerciseGroup.logs);
            const uniqueDates = new Set(
              exerciseGroup.logs.map(log => 
                new Date(log.workOutLogs.date).toISOString().split("T")[0]
              )
            ).size;
            
            return (
              <Card key={exerciseGroup.exerciseId} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-green-500" />
                        {exerciseGroup.exerciseName}
                      </CardTitle>
                      <div className="flex gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {uniqueDates} days
                        </span>
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          {totalSets} sets
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          {totalVolume.toLocaleString()} lbs
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCard(cardId)}
                      className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`space-y-2 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
                    {exerciseGroup.logs.slice(0, isExpanded ? undefined : 4).map((log, idx) => (
                      <div key={log.workOutLogs.logId} className="flex justify-between items-center bg-gray-50 rounded-md px-3 py-2">
                        <span className="text-xs text-gray-600">
                          {formatDate(log.workOutLogs.date)}
                        </span>
                        <div className="flex items-center gap-3 text-sm">
                          {log.workOutLogs.weight && (
                            <span className="flex items-center gap-1 text-gray-700">
                              <Weight className="w-3 h-3" />
                              {log.workOutLogs.weight} lbs
                            </span>
                          )}
                          <span className="text-gray-700">
                            {log.workOutLogs.reps} reps
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!isExpanded && exerciseGroup.logs.length > 4 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      +{exerciseGroup.logs.length - 4} more sessions
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {((viewMode === 'date' && dataByDate.length === 0) || 
        (viewMode === 'exercise' && dataByExercise.length === 0)) && (
        <div className="text-center py-12">
          <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No workout logs found</p>
        </div>
      )}
    </div>
  );
};

export default LogCards;