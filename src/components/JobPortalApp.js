// JobPortalApp.js
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

function JobPortalApp() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '' });
  const [appliedJobs, setAppliedJobs] = useState([]);

  const postJob = () => {
    if (newJob.title && newJob.description) {
      setJobs([...jobs, { ...newJob, id: Date.now() }]);
      setNewJob({ title: '', description: '' });
    }
  };

  const applyToJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert('Applied successfully!');
    } else {
      alert('Already applied.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">🌟 Job Portal</h1>

        {/* Post Job Section */}
        <Card className="mb-10 shadow-xl border border-blue-100">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold text-blue-600">Post a Job (Recruiters)</h2>
            <div className="grid gap-4">
              <Input
                placeholder="Job Title"
                className="border border-blue-300 focus:ring-blue-500"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              />
              <Textarea
                placeholder="Job Description"
                className="border border-blue-300 focus:ring-blue-500"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={postJob}>Post Job</Button>
            </div>
          </CardContent>
        </Card>

        {/* View and Apply Jobs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Available Jobs (Job Seekers)</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No jobs posted yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="shadow-md border border-gray-200 hover:shadow-lg transition">
                  <CardContent className="space-y-4 p-5">
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                    <Button
                      onClick={() => applyToJob(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                      className={`w-full ${appliedJobs.includes(job.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    >
                      {appliedJobs.includes(job.id) ? '✅ Applied' : 'Apply Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPortalApp;
